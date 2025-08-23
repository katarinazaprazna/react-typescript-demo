const createChanceOfFailure = (chance: number) => chance <= Math.random();

export type ServerError = {
  status: number;
  message: string;
};

// This simulates api call time
export const callAPI = <T>(callback: () => T, chanceOfSuccess = 1): Promise<T> =>
  new Promise((resolve, reject) => {
    if (createChanceOfFailure(chanceOfSuccess)) {
      return reject('Something went wrong!');
    }
    return setTimeout(() => resolve(callback()), 1500);
  });
