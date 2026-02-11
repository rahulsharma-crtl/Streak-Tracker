import { AppSettings } from './types';

export const DEFAULT_SETTINGS: AppSettings = {
  dayStartHour: 4, // 4 AM is a common "start of day" for night owls
  userName: 'Friend',
  syncKey: '',
  theme: 'neon',
};

export const MESSAGES_PRAISE = [
  // General / Stoic
  "You are stronger than your impulses.",
  "Every day of freedom is a victory.",
  "Reclaiming your mind, one day at a time.",
  "The mind is a wonderful servant but a terrible master. You are the master.",
  "He who conquers himself is the mightiest warrior.",
  "Freedom feels better than a cheap thrill.",
  "Discipline is the bridge between goals and accomplishment.",
  "You are building a legacy of self-control.",
  "Peace comes from within. Do not seek it without.",

  // Lord Shiva / Adiyogi Themes
  "Like Shiva, consume the poison of impulse and hold it still.",
  "Be the Adiyogi: Master of the mind, calm amidst chaos.",
  "Destroy the old habits to create the new self.",
  "Stillness is the ultimate power. Be as still as the mountain.",
  "Open your third eye: See the reality, not the illusion of desire.",
  "The fire of discipline burns away all impurities.",
  "You are not the body, you are not the mind. You are the observer.",
  "Om Namah Shivaya. Conquer the senses.",
  "Stand firm like Mount Kailash.",
  "Let your will be your Trishul, destroying the enemies of the mind.",
];

export const MESSAGES_COMPASSION = [
  // General Compassion
  "Relapse is part of recovery. Be gentle with yourself.",
  "One slip doesn't erase your progress.",
  "Learn from this moment, then let it go.",
  "You are not your mistakes.",
  "Tomorrow is a new opportunity.",
  "Reflect, reset, and restart.",
  "Even the moon has phases. You will rise again.",
  "Guilt is a weight you do not need to carry. Drop it.",
  "A stumble is not a fall if you keep moving.",

  // Lord Shiva / Eastern Wisdom on Failure & Rebirth
  "Creation follows destruction. Let this moment destroy your ego, not your spirit.",
  "The past is like ash (Bhasma). Smear it on your forehead as a reminder, then move on.",
  "Shiva destroys only to transform. Use this pain to transform yourself.",
  "Do not dwell in the past. The present moment is where the Yogi resides.",
  "The lotus blooms from the mud. Your struggle is the soil for your growth.",
  "Observe the slip without judgment. You are the witness, not the actor.",
  "Everything is impermanent, even this failure. Let it pass.",
  "Rise from the ashes. That is the nature of the eternal soul.",
  "Do not be attached to your success, do not be attached to your failure. Just be.",
  "The river flows over rocks but never stops. Be like the river.",
];