declare global {
  interface String {
    toSplitWord(): string;
  }
}

String.prototype.toSplitWord = function (): string {
  return this.toString().replace(new RegExp('(?<=[A-Z])(?=[A-Z][a-z])|(?<=[^A-Z])(?=[A-Z])|(?<=[A-Za-z])(?=[^A-Za-z])'), " ");
};

export {};
