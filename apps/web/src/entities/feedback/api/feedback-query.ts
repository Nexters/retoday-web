import { useMutation, type UseMutationOptions } from "@recap/react-query";

type PostFeedbackVariables = {
  content: string;
};

const usePostFeedback = (
  options?: UseMutationOptions<void, Error, PostFeedbackVariables>,
) => {
  return useMutation<void, Error, PostFeedbackVariables>({
    mutationFn: async ({ content }) => {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ content }),
      });

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message ?? "Failed to submit feedback");
      }
    },
    ...options,
  });
};

export { usePostFeedback };
