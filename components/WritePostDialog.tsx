"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { type WritePostFormValues, writePostSchema } from "@/lib/validations";

type WritePostDialogProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
};

export function WritePostDialog({ open, onOpenChange }: WritePostDialogProps) {
  const [mounted, setMounted] = useState(false);
  const [closing, setClosing] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitSuccessful },
  } = useForm<WritePostFormValues>({
    resolver: zodResolver(writePostSchema),
    defaultValues: {
      category: "sell",
      title: "",
      price: "",
      body: "",
    },
  });

  /* eslint-disable react-hooks/set-state-in-effect */
  useEffect(() => {
    if (open) {
      setClosing(false);
      setMounted(true);
    } else if (mounted) {
      setClosing(true);
    }
  }, [open]); // eslint-disable-line react-hooks/exhaustive-deps
  /* eslint-enable react-hooks/set-state-in-effect */

  useEffect(() => {
    if (!open) {
      reset({ category: "sell", title: "", price: "", body: "" });
    }
  }, [open, reset]);

  const close = useCallback(() => {
    onOpenChange(false);
  }, [onOpenChange]);

  const handleAnimationEnd = useCallback(() => {
    if (closing) {
      setMounted(false);
      setClosing(false);
    }
  }, [closing]);

  const onSubmit = (data: WritePostFormValues) => {
    console.info("[write-post]", data);
  };

  if (!mounted) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center sm:items-center">
      <button
        type="button"
        aria-label="닫기"
        className={`absolute inset-0 bg-black/60 ${closing ? "animate-fade-out" : "animate-fade-in"}`}
        onClick={close}
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="write-post-title"
        onAnimationEnd={handleAnimationEnd}
        className={`relative z-10 m-0 w-full max-w-lg rounded-t-xl border border-zinc-700 bg-dark-600 p-4 shadow-xl sm:m-4 sm:rounded-xl ${
          closing
            ? "animate-slide-down sm:animate-scale-out"
            : "animate-slide-up sm:animate-scale-in"
        }`}
      >
        <div className="mb-4 flex items-center justify-between gap-2">
          <h2 id="write-post-title" className="text-lg font-bold text-zinc-100">
            글쓰기
          </h2>
          <button
            type="button"
            onClick={close}
            className="rounded-lg px-2 py-1 text-sm text-zinc-400 hover:bg-white/5 hover:text-zinc-200"
          >
            닫기
          </button>
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex flex-col gap-3"
          noValidate
        >
          <div>
            <label htmlFor="write-category" className="mb-1 block text-xs font-medium text-zinc-400">
              유형
            </label>
            <select
              id="write-category"
              className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:border-blurple-500 focus:outline-none focus:ring-1 focus:ring-blurple-500"
              {...register("category")}
            >
              <option value="sell">판매</option>
              <option value="buy">구매</option>
              <option value="swap">교환</option>
            </select>
            {errors.category ? (
              <p className="mt-1 text-xs text-red-400" role="alert">
                {errors.category.message}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="write-title" className="mb-1 block text-xs font-medium text-zinc-400">
              제목
            </label>
            <input
              id="write-title"
              type="text"
              className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 focus:border-blurple-500 focus:outline-none focus:ring-1 focus:ring-blurple-500"
              {...register("title")}
            />
            {errors.title ? (
              <p className="mt-1 text-xs text-red-400" role="alert">
                {errors.title.message}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="write-price" className="mb-1 block text-xs font-medium text-zinc-400">
              가격 / 조건
            </label>
            <input
              id="write-price"
              type="text"
              placeholder="예: ₩10,000, 협의, 1:1"
              className="w-full rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-blurple-500 focus:outline-none focus:ring-1 focus:ring-blurple-500"
              {...register("price")}
            />
            {errors.price ? (
              <p className="mt-1 text-xs text-red-400" role="alert">
                {errors.price.message}
              </p>
            ) : null}
          </div>

          <div>
            <label htmlFor="write-body" className="mb-1 block text-xs font-medium text-zinc-400">
              내용
            </label>
            <textarea
              id="write-body"
              rows={5}
              className="w-full resize-y rounded-lg border border-zinc-600 bg-zinc-800 px-3 py-2 text-sm text-zinc-100 placeholder:text-zinc-500 focus:border-blurple-500 focus:outline-none focus:ring-1 focus:ring-blurple-500"
              placeholder="거래 조건·연락 방법 등을 적어 주세요"
              {...register("body")}
            />
            {errors.body ? (
              <p className="mt-1 text-xs text-red-400" role="alert">
                {errors.body.message}
              </p>
            ) : null}
          </div>

          {isSubmitSuccessful ? (
            <p className="text-sm text-emerald-400" role="status">
              검증을 통과했습니다. (데모: 콘솔에만 출력)
            </p>
          ) : null}

          <div className="flex justify-end gap-2 pt-1">
            <button
              type="button"
              onClick={close}
              className="rounded-lg border border-zinc-600 px-4 py-2 text-sm font-medium text-zinc-300 hover:bg-white/5"
            >
              취소
            </button>
            <button
              type="submit"
              className="rounded-lg bg-blurple-500 px-4 py-2 text-sm font-semibold text-white hover:bg-blurple-600"
            >
              등록
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
