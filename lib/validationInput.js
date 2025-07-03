export const validationInput = [
  {
    label: "Step Name",
    name: "title",
    placeholder: "e.g., Landing Page Test, User Survey, Etc",
    multiline: false,
  },
  {
    label: "Description",
    name: "description",
    placeholder: "Describe What You Are Testing...",
    multiline: true,
  },
  {
    label: "Target Goal",
    name: "target",
    placeholder: "190",
    multiline: false,
    keyboardType: "number-pad",
  },
  {
    label: "Actual Result",
    name: "result",
    placeholder: "89",
    multiline: false,
    keyboardType: "number-pad",
  },
  {
    label: "Notes & Learnings",
    name: "note",
    placeholder: "What Did You Learn From This Validation Step?",
    multiline: true,
  },
];
