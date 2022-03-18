interface IsBot {
  (userAgent: string): boolean;
  extend(additionalBots: string[]): void;
}

const isBot: IsBot;

export default isBot;
