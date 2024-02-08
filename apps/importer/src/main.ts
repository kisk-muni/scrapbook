import { readFileSync } from "fs";
import Papa, { ParseResult } from "papaparse";
import slugify from "slugify";
import { supabase } from "shared";

type Row = {
  [key: string]: string;
};

type Parsed = ParseResult<Row>;

type SurveyRow = {
  id: number | null;
  startTime: string | null;
  completionTime: string | null;
  lastModifiedTime: string | null;
  name: string | null;
  userName: string | null;
  studyStartYear: number | null;
  studyStartSemester: string | null;
  portfolioLink: string | null;
  assumedBenefits: string | null;
  barriers: string | null;
  creationBenefit: number | null;
  creationBenefitDescription: string | null;
  difficulties: string | null;
  profilationInterest: string[] | null;
  idealPortfolio: string | null;
  assumedPostPeriod: string | null;
  comment: string | null;
  canBeUsedInResearch: boolean;
  canBePublic: boolean;
};

function getISO(d: string) {
  if (d) return new Date(d).toISOString();
  return null;
}

async function parseStudents(): Promise<SurveyRow[]> {
  const fields = {
    id: "ID",
    startTime: "Start time",
    completionTime: "Completion time",
    email: "Email",
    name: "Name",
    lastModifiedTime: "Last modified time",
    fullName: "Vaše jméno a příjmení\n",
    studyStart: "Kdy jste zahájili magisterské studium?\n",
    portfolioLink: "Odkaz na portfolio:\n",
    assumedBenefits:
      "Popište, v čem si myslíte, že by pro vás portfolio mohlo být přínosné.",
    barriers: "Popište, jaká obavy tvorba a využívání portfolia přináší.",
    creationBenefit:
      "Tvorba portfolia pro mě byla přínosná (např. seberozvoj, nové znalosti/dovednosti,...)\n",
    creationBenefitDescription:
      "Popište, v čem pro vás doposud byla tvorba portfolia přínosná:",
    difficulties:
      "S jakými složitostmi jste se během tvorby portfolií setkali? Chyběly vám nějaké informace nebo znalosti?",
    canBePublic:
      "Můžeme vaše portfolio sdílet v rámci KISK komunity na Scrapbooku? (pozn. portfolio si sem případně můžete přidat i sami)",
    profilationInterest: "Jaká profilace na KISKu vás zajímá?",
    idealPortfolio:
      "Kdybyste měli popsat představu vašeho ideálního portfolia na konci studia, jaké by bylo? (forma, obsah,...)",
    assumedPostPeriod:
      "Jak často plánujete přidávat příspěvky na vaše portfolio?\n",
    canBeUsedInResearch:
      "Můžeme data z dotazníku a vašeho portfolia použít pro výzkumné a vzdělávací účely?",
    comment:
      "Máte nějaký další komentář, který k tvorbě portfolií nebo portfoliím jako takovým chcete sdílet?",
  };

  const [, , filePath] = process.argv;

  const file = readFileSync(filePath, "utf8");

  const parsedData = Papa.parse(file, {
    header: true,
    dynamicTyping: true,
  });

  const students: SurveyRow[] = (parsedData as Parsed).data.map((row) => {
    const [studyStartSemester, studyStartYear] =
      row[fields.studyStart].split(" ");
    // console.log(studyStartSemester, studyStartYear);
    return {
      id: parseInt(row[fields.id], 10),
      startTime: getISO(row[fields.startTime]),
      completionTime: getISO(row[fields.completionTime]),
      lastModifiedTime: getISO(row[fields.lastModifiedTime]),
      userName: slugify(row[fields.fullName], {
        lower: true,
        replacement: "-",
        locale: "cs",
        trim: true,
      }),
      name: row[fields.fullName],
      studyStartYear: parseInt(studyStartYear, 10),
      studyStartSemester,
      portfolioLink: row[fields.portfolioLink],
      assumedBenefits: row[fields.assumedBenefits],
      barriers: row[fields.barriers],
      creationBenefit: parseInt(row[fields.creationBenefit], 10),
      creationBenefitDescription: row[fields.creationBenefitDescription],
      difficulties: row[fields.difficulties],
      profilationInterest: row[fields.profilationInterest]
        .split(";")
        .filter((profilation) => profilation !== ""),
      idealPortfolio: row[fields.idealPortfolio],
      assumedPostPeriod: row[fields.assumedPostPeriod],
      comment: row[fields.comment],
      canBeUsedInResearch: row[fields.canBeUsedInResearch] === "ano",
      canBePublic: row[fields.canBePublic] === "ano",
    };
  });
  return students;
}

// add student
// 1. create profile record
async function addStudent(surveyRow: SurveyRow) {
  const { data, error } = await supabase
    .from("profiles")
    .upsert(
      {
        username: surveyRow.userName,
        full_name: surveyRow.name,
        is_public: surveyRow.canBePublic,
        study_start_semester_year: surveyRow.studyStartYear,
        study_start_semester_kind: surveyRow.studyStartSemester,
        can_be_used_in_research: surveyRow.canBeUsedInResearch,
        is_teacher: false,
      },
      {
        onConflict: "username",
      }
    )
    .select();
  if (error) console.error(surveyRow.name, error);
  else return data[0].id;
  return null;
}

function getDataSource(providedURL: string | null) {
  let url: URL | null = null;
  if (!providedURL)
    return {
      url,
      feed_url: null,
      platform: "other",
    };
  try {
    url = new URL(providedURL);
  } catch (error) {
    console.log(error, providedURL);
    process.exit(1);
  }
  const platforms = [
    "wordpress",
    "wix",
    "notion",
    "webflow",
    "webnode",
    "blogspot",
  ];

  let platform = "custom";
  let feedUrl: string = "";

  platforms.forEach((platformShort) => {
    if (providedURL.includes(platformShort)) {
      platform = platformShort;
    }
  });

  if (platform === "wordpress")
    feedUrl = new URL("/feed", providedURL).toString();
  else if (platform === "blogspot")
    feedUrl = new URL("/feeds/posts/default", providedURL).toString();
  else feedUrl = url?.toString() || "";

  return {
    url: url?.toString(),
    feed_url: feedUrl,
    platform,
  };
}

async function addPortfolio(studentId: string, surveyRow: SurveyRow) {
  const dataSource = getDataSource(surveyRow.portfolioLink);
  const { data, error } = await supabase
    .from("portfolios")
    .upsert(
      {
        name: surveyRow.name,
        url: dataSource.url,
        feed_url: dataSource.feed_url,
        platform: dataSource.platform,
        profile_id: studentId,
        is_public: surveyRow.canBePublic,
        can_be_used_in_research: surveyRow.canBeUsedInResearch,
      },
      {
        onConflict: "feed_url",
      }
    )
    .select();
  if (error) console.error(surveyRow.name, error);
  else return data[0].id;
  return null;
}

async function addSurvey(studentId: string, surveyRow: SurveyRow) {
  const dataSource = getDataSource(surveyRow.portfolioLink);
  const { data, error } = await supabase
    .from("portfolios")
    .upsert(
      {
        name: surveyRow.name,
        url: dataSource.url,
        feed_url: dataSource.feed_url,
        platform: dataSource.platform,
        profile_id: studentId,
      },
      {
        onConflict: "profile_id, feed_url",
      }
    )
    .select();
  if (error) console.error(surveyRow.name, error);
  else return data[0].id;
  return null;
}

async function main() {
  const students = await parseStudents();
  const sliced = students.slice();
  for (let i = 0; i < sliced.length; i++) {
    const student = sliced[i];
    const studentId = await addStudent(student);
    if (studentId !== null) {
      await addPortfolio(studentId, student);
      console.log(student);
    } else {
      console.log("skipping addPortfolio for student", student.name);
    }
  }
}

(async () => {
  await main();
})();
