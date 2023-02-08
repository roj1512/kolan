import { MongoClient } from "mongo";

export const client = new MongoClient();

export enum Collection {
  Authors = "authors",
  CodeChallenges = "code_challenges",
  Definitions = "definitions",
  Submissions = "submissions",
  Votes = "votes",
}
