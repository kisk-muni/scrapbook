import { relations } from "drizzle-orm";
import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";

import { profiles } from "./index";
import { posts } from "./posts";

export const profilesToPosts = pgTable(
  "profiles_to_posts",
  {
    profileId: uuid("profile_id")
      .notNull()
      .references(() => profiles.id),
    postId: uuid("post_id")
      .notNull()
      .references(() => posts.id),
  },
  (t) => ({
    pk: primaryKey({ columns: [t.profileId, t.postId] }),
  })
);

export const profilesToPostsRelation = relations(
  profilesToPosts,
  ({ one }) => ({
    post: one(posts, {
      fields: [profilesToPosts.postId],
      references: [posts.id],
    }),
    profile: one(profiles, {
      fields: [profilesToPosts.profileId],
      references: [profiles.id],
    }),
  })
);
