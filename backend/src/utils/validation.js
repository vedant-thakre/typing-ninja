import joi from "joi";

export const validateAddSnippet = (data) => {
  const schema = joi
    .object({
      title: joi.string().min(5).max(60).required(),
      content: joi.string().required(),
      difficulty: joi.string().valid("easy", "medium", "hard").required(),
    })
    .custom((value, helpers) => {
      const { content, difficulty } = value;
      const wordCount = content.split(/\s+/).length;

      if (difficulty === "easy" && (wordCount < 180 || wordCount > 240)) {
        return helpers.error("any.custom", {
          message: "Easy snippets should have 180-240 words",
        });
      }
      if (difficulty === "medium" && (wordCount < 280 || wordCount > 360)) {
        return helpers.error("any.custom", {
          message: "Medium snippets should have 280-360 words",
        });
      }
      if (difficulty === "hard" && (wordCount < 380 || wordCount > 460)) {
        return helpers.error("any.custom", {
          message: "Hard snippets should have 380-460 words",
        });
      }

      return value;
    });

  return schema.validate(data);
};
