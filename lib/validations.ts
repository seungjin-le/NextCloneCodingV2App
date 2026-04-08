import { z } from "zod";

export const searchSchema = z.object({
  q: z
    .string()
    .trim()
    .min(1, "검색어를 입력해 주세요")
    .max(200, "200자 이내로 입력해 주세요"),
});

export type SearchFormValues = z.infer<typeof searchSchema>;

export const writePostSchema = z.object({
  category: z.enum(["sell", "buy", "swap"]),
  title: z
    .string()
    .trim()
    .min(2, "제목은 2자 이상 입력해 주세요")
    .max(120, "제목은 120자 이내로 입력해 주세요"),
  price: z.string().trim().max(50, "가격은 50자 이내로 입력해 주세요"),
  body: z
    .string()
    .trim()
    .min(10, "내용은 10자 이상 입력해 주세요")
    .max(2000, "2000자 이내로 입력해 주세요"),
});

export type WritePostFormValues = z.infer<typeof writePostSchema>;
