export const cs = {
  slash_menu: {
    heading: {
      title: 'Nadpis 1',
      subtext: 'Nejvyšší úroveň nadpisu',
      aliases: ['h', 'nadpis1', 'h1'],
      group: 'Nadpisy',
    },
    heading_2: {
      title: 'Nadpis 2',
      subtext: 'Klíčová sekce nadpisu',
      aliases: ['h2', 'nadpis2', 'podnadpis'],
      group: 'Nadpisy',
    },
    heading_3: {
      title: 'Nadpis 3',
      subtext: 'Podsekce a skupinový nadpis',
      aliases: ['h3', 'nadpis3', 'podnadpis'],
      group: 'Nadpisy',
    },
    numbered_list: {
      title: 'Číslovaný seznam',
      subtext: 'Seznam s očíslovanými položkami',
      aliases: ['ol', 'li', 'seznam', 'číslovanýseznam', 'číslovaný seznam'],
      group: 'Základní bloky',
    },
    bullet_list: {
      title: 'Odrážkový seznam',
      subtext: 'Seznam s nečíslovanými položkami',
      aliases: ['ul', 'li', 'seznam', 'odrážkovýseznam', 'odrážkový seznam'],
      group: 'Základní bloky',
    },
    check_list: {
      title: 'Kontrolní seznam',
      subtext: 'Seznam s checkboxy',
      aliases: [
        'ul',
        'li',
        'seznam',
        'kontrolníseznam',
        'kontrolní seznam',
        'zaškrtnutý seznam',
        'checkbox',
      ],
      group: 'Základní bloky',
    },
    paragraph: {
      title: 'Odstavec',
      subtext: 'Hlavní část dokumentu',
      aliases: ['p', 'odstavec'],
      group: 'Základní bloky',
    },
    table: {
      title: 'Tabulka',
      subtext: 'Tabulka s editovatelnými buňkami',
      aliases: ['tabulka'],
      group: 'Pokročilé',
    },
    image: {
      title: 'Obrázek',
      subtext: 'Změnitelný obrázek s popiskem',
      aliases: [
        'obrázek',
        'nahrátObrázek',
        'nahrát',
        'img',
        'fotka',
        'média',
        'url',
      ],
      group: 'Média',
    },
    video: {
      title: 'Video',
      subtext: 'Změnitelné video s popiskem',
      aliases: [
        'video',
        'nahrátVideo',
        'nahrát',
        'mp4',
        'film',
        'média',
        'url',
      ],
      group: 'Média',
    },
    audio: {
      title: 'Zvuk',
      subtext: 'Vložený zvuk s popiskem',
      aliases: [
        'zvuk',
        'nahrátZvuk',
        'nahrát',
        'mp3',
        'zvukový',
        'média',
        'url',
      ],
      group: 'Média',
    },
    file: {
      title: 'Soubor',
      subtext: 'Vložený soubor',
      aliases: ['soubor', 'nahrát', 'vložit', 'média', 'url'],
      group: 'Média',
    },
    emoji: {
      title: 'Emoji',
      subtext: 'Vyhledat a vložit emoji',
      aliases: ['emoji', 'emote', 'emotikon', 'obličej'],
      group: 'Ostatní',
    },
  },
  placeholders: {
    default: 'Co jste se dnes naučili ?!',
    heading: 'Nadpis',
    bulletListItem: 'Seznam',
    numberedListItem: 'Seznam',
    checkListItem: 'Seznam',
  },
  file_blocks: {
    image: {
      add_button_text: 'Přidat obrázek',
    },
    video: {
      add_button_text: 'Přidat video',
    },
    audio: {
      add_button_text: 'Přidat zvuk',
    },
    file: {
      add_button_text: 'Přidat soubor',
    },
  },
  // from react package:
  side_menu: {
    add_block_label: 'Přidat blok',
    drag_handle_label: 'Otevřít nabídku bloků',
  },
  drag_handle: {
    delete_menuitem: 'Smazat',
    colors_menuitem: 'Barvy',
  },
  table_handle: {
    delete_column_menuitem: 'Smazat sloupec',
    delete_row_menuitem: 'Smazat řádek',
    add_left_menuitem: 'Přidat sloupec vlevo',
    add_right_menuitem: 'Přidat sloupec vpravo',
    add_above_menuitem: 'Přidat řádek nad',
    add_below_menuitem: 'Přidat řádek pod',
  },
  suggestion_menu: {
    no_items_title: 'Žádné položky nenalezeny',
    loading: 'Načítání…',
  },
  color_picker: {
    text_title: 'Text',
    background_title: 'Pozadí',
    colors: {
      default: 'Výchozí',
      gray: 'Šedá',
      brown: 'Hnědá',
      red: 'Červená',
      orange: 'Oranžová',
      yellow: 'Žlutá',
      green: 'Zelená',
      blue: 'Modrá',
      purple: 'Fialová',
      pink: 'Růžová',
    },
  },

  formatting_toolbar: {
    bold: {
      tooltip: 'Tučné',
      secondary_tooltip: 'Mod+B',
    },
    italic: {
      tooltip: 'Kurzíva',
      secondary_tooltip: 'Mod+I',
    },
    underline: {
      tooltip: 'Podtržené',
      secondary_tooltip: 'Mod+U',
    },
    strike: {
      tooltip: 'Přeškrtnutí',
      secondary_tooltip: 'Mod+Shift+S',
    },
    code: {
      tooltip: 'Kód',
      secondary_tooltip: '',
    },
    colors: {
      tooltip: 'Barvy',
    },
    link: {
      tooltip: 'Vytvořit odkaz',
      secondary_tooltip: 'Mod+K',
    },
    file_caption: {
      tooltip: 'Upravit popisek',
      input_placeholder: 'Upravit popisek',
    },
    file_replace: {
      tooltip: {
        image: 'Nahradit obrázek',
        video: 'Nahradit video',
        audio: 'Nahradit zvuk',
        file: 'Nahradit soubor',
      } as Record<string, string>,
    },
    file_rename: {
      tooltip: {
        image: 'Přejmenovat obrázek',
        video: 'Přejmenovat video',
        audio: 'Přejmenovat zvuk',
        file: 'Přejmenovat soubor',
      } as Record<string, string>,
      input_placeholder: {
        image: 'Přejmenovat obrázek',
        video: 'Přejmenovat video',
        audio: 'Přejmenovat zvuk',
        file: 'Přejmenovat soubor',
      } as Record<string, string>,
    },
    file_download: {
      tooltip: {
        image: 'Stáhnout obrázek',
        video: 'Stáhnout video',
        audio: 'Stáhnout zvuk',
        file: 'Stáhnout soubor',
      } as Record<string, string>,
    },
    file_delete: {
      tooltip: {
        image: 'Smazat obrázek',
        video: 'Smazat video',
        audio: 'Smazat zvuk',
        file: 'Smazat soubor',
      } as Record<string, string>,
    },
    file_preview_toggle: {
      tooltip: 'Přepnout náhled',
    },
    nest: {
      tooltip: 'Vnořit blok',
      secondary_tooltip: 'Tab',
    },
    unnest: {
      tooltip: 'Odvnořit blok',
      secondary_tooltip: 'Shift+Tab',
    },
    align_left: {
      tooltip: 'Zarovnat text vlevo',
    },
    align_center: {
      tooltip: 'Zarovnat text na střed',
    },
    align_right: {
      tooltip: 'Zarovnat text vpravo',
    },
    align_justify: {
      tooltip: 'Zarovnat text do bloku',
    },
  },
  file_panel: {
    upload: {
      title: 'Nahrát',
      file_placeholder: {
        image: 'Nahrát obrázek',
        video: 'Nahrát video',
        audio: 'Nahrát zvuk',
        file: 'Nahrát soubor',
      } as Record<string, string>,
      upload_error: 'Chyba: Nahrávání selhalo',
    },
    embed: {
      title: 'Vložit',
      embed_button: {
        image: 'Vložit obrázek',
        video: 'Vložit video',
        audio: 'Vložit zvuk',
        file: 'Vložit soubor',
      } as Record<string, string>,
      url_placeholder: 'Zadejte URL',
    },
  },
  link_toolbar: {
    delete: {
      tooltip: 'Odstranit odkaz',
    },
    edit: {
      text: 'Upravit odkaz',
      tooltip: 'Upravit',
    },
    open: {
      tooltip: 'Otevřít v nové záložce',
    },
    form: {
      title_placeholder: 'Upravit název',
      url_placeholder: 'Upravit URL',
    },
  },
  generic: {
    ctrl_shortcut: 'Ctrl',
  },
};
