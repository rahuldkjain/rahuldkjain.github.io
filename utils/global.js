export const loadExternalScript = (link, cb) => {
  let script = document.createElement("script");
  script.src = link;
  script.onload = cb;
  document.body.appendChild(script);
};
