import { challengeSettings } from '@/app/(private routes)/challenge/challenge-settings-form';

export const constructApiUrl = (baseUrl: string, settings: challengeSettings) => {
  // Create a URL instance from the base URL
  const url = new URL(baseUrl);

  // Always add the number of questions
  url.searchParams.set('amount', settings.numberOfQuestions.toString());

  // Conditionally add other parameters if they are not 'any'
  if (settings.category && settings.category !== 'any') {
    url.searchParams.set('category', settings.category);
  }
  if (settings.difficulty && settings.difficulty !== 'any') {
    url.searchParams.set('difficulty', settings.difficulty);
  }
  if (settings.type && settings.type !== 'any') {
    url.searchParams.set('type', settings.type);
  }

  // Return the final URL as a string
  return url.toString();
}