export const scrollIntoView = (elementSelector: string, scrollPosition: ScrollLogicalPosition = 'center'): void => {
  /* TODO: refactor to a service to avoid direct access to document */
  const element: HTMLElement | null = document.querySelector(elementSelector);
  element?.scrollIntoView({behavior: 'smooth', block: scrollPosition});
}

export const scrollToFirstInvalidControl = (): void => {
  scrollIntoView('.ng-invalid:not(div, form), .inline-notification[type="error"]');
}
