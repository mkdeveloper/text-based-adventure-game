import chalkAnimation from "chalk-animation";

export const sleep = (ms = 2000): Promise<void> =>
  new Promise((resolve) => {
    setTimeout(resolve, ms);
  });

export const welcome = async (param: string) => {
  const welcomeScreen = chalkAnimation.rainbow(param);

  await sleep();
  welcomeScreen.stop();
};
