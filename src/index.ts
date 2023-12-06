import {
  LetterparserContentType,
  LetterparserNode,
  parseBody,
} from "./parser.ts";
import {
  extractMail,
  LetterparserAttachment,
  LetterparserMail,
} from "./extractor.ts";

export type {
  LetterparserAttachment,
  LetterparserContentType,
  LetterparserMail,
  LetterparserNode,
};

export function extract(message: string | LetterparserNode): LetterparserMail {
  if (typeof message === "string") {
    return extractMail(parse(message));
  } else {
    return extractMail(message);
  }
}

export function parse(message: string): LetterparserNode {
  const lines = message.replace(/\r/g, "").split("\n");
  const [contents] = parseBody(1, lines, 0, lines.length);
  return contents;
}
