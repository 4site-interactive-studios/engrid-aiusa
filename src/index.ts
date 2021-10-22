import { Options, App } from "@4site/engrid-common"; // Uses ENGrid via NPM
// import { Options, App } from "../../engrid-scripts/packages/common"; // Uses ENGrid via Visual Studio Workspace
import "./sass/main.scss";
import "./scripts/main.js";

const options: Options = {
  applePay: false,
  CapitalizeFields: true,
  ClickToExpand: true,
  CurrencySymbol: "$",
  CurrencySeparator: ".",
  MediaAttribution: true,
  SkipToMainContentLink: true,
  SrcDefer: true,
  ProgressBar: true,
  // RememberMe: {
  //   checked: true,
  //   remoteUrl: 'https://amnestyusa.org/en_cookies_4676876234786091256.html',
  //   fieldOptInSelectorTarget: '.en__field.en__field--checkbox.en__field--28051, .en__field.en__field--checkbox.en__field--871601.en__field--NOT_TAGGED_81, input[name="supporter.emailAddress"]',
  //   fieldOptInSelectorTargetLocation: 'after',
  //   fieldClearSelectorTarget: 'label[for="en__field_supporter_firstName"], label[for="en__field_supporter_emailAddress"]',
  //   fieldClearSelectorTargetLocation: 'after',
  //   fieldNames: [
  //     'supporter.firstName',
  //     'supporter.lastName',
  //     'supporter.address1',
  //     'supporter.address2',
  //     'supporter.city',
  //     'supporter.country',
  //     'supporter.region',
  //     'supporter.postcode',
  //     'supporter.emailAddress'
  //   ]
  // },
  Debug: App.getUrlParameter("debug") == "true" ? true : false,
  onLoad: () => console.log("Starter Theme Loaded"),
  onResize: () => console.log("Starter Theme Window Resized"),
};
new App(options);
