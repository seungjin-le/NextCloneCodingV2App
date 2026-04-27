import { z } from "zod";

export function normalizeCategorySlug(value: string) {
  return value.trim().toLowerCase().replace(/[\s_]+/g, "-");
}

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

export const categoryRegistrationSchema = z.object({
  section: z.enum(["group", "market", "community"]),
  label: z
    .string()
    .trim()
    .min(2, "카테고리명은 2자 이상 입력해 주세요")
    .max(24, "카테고리명은 24자 이내로 입력해 주세요"),
  slug: z
    .string()
    .transform(normalizeCategorySlug)
    .pipe(
      z
        .string()
        .min(2, "슬러그는 2자 이상 입력해 주세요")
        .max(40, "슬러그는 40자 이내로 입력해 주세요")
        .regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "슬러그는 영문 소문자, 숫자, 하이픈만 사용할 수 있습니다")
    ),
});

export type CategoryRegistrationFormValues = z.input<typeof categoryRegistrationSchema>;
export type CategoryRegistrationValues = z.output<typeof categoryRegistrationSchema>;
