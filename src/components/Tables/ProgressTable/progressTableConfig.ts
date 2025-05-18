type Widths = {
  number: number;
  description: number;
  attachment: number;
  actions: number;
};

class ProgressTableConfig {
  readonly columnWidths: Widths & { week: number };
  readonly leftPositions: Record<
    "number" | "description" | "attachment",
    number
  >;

  constructor(widths: Widths) {
    const totalWidth = 1200;
    const weekCount = 5;

    const remaining =
      totalWidth -
      (widths.number + widths.description + widths.attachment + widths.actions);
    if (remaining < 0) throw new Error(`Widths exceed total`);

    const week = remaining / weekCount;

    this.columnWidths = { ...widths, week };
    this.leftPositions = {
      number: 0,
      description: widths.number,
      attachment: widths.number + widths.description,
    };
  }
}

const progressTableConfig = new ProgressTableConfig({
  number: 48,
  description: 185,
  attachment: 130,
  actions: 60,
});
export default progressTableConfig;
