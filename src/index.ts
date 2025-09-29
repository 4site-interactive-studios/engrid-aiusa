import {
  Options,
  App,
  DonationAmount,
  DonationFrequency,
} from "@4site/engrid-scripts"; // Uses ENGrid via NPM
// import {
//   Options,
//   App,
//   DonationAmount,
//   DonationFrequency,
// } from "../../engrid/packages/scripts"; // Uses ENGrid via Visual Studio Workspace
import { MonthlyAmounts } from "./scripts/monthly-amounts";
import MultistepForm from "./scripts/multistep-form";
import "./sass/main.scss";
import DonationLightboxForm from "./scripts/donation-lightbox-form";
import { customScript } from "./scripts/main";
import { AddDAF } from "./scripts/add-daf";

import { CheckboxLabel } from "./scripts/checkbox-label";
import { UanRememberMe } from "./scripts/uan-remember-me";

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
  MinAmount: 5,
  MaxAmount: 100000000,
  MinAmountMessage: "Please enter a minimum donation of $5",
  MaxAmountMessage: "Amount must be less than $100,000,000",
  Debug: App.getUrlParameter("debug") == "true" ? true : false,
  onLoad: () => {
    (<any>window).DonationLightboxForm = DonationLightboxForm;
    new DonationLightboxForm(DonationAmount, DonationFrequency);
    customScript(App);
    new MonthlyAmounts();
    new MultistepForm();
    new CheckboxLabel();
    new UanRememberMe();
  },
  onResize: () => console.log("Starter Theme Window Resized"),
};
// if (["ADVOCACY", "EMAILTOTARGET", "TWEETPAGE"].includes(App.getPageType())) {
//   options.RememberMe = {
//     checked: true,
//     remoteUrl: "https://amnestyusa.org/en_cookies_4676876234786091256.html",
//     fieldOptInSelectorTarget:
//       '.en__field.en__field--checkbox.en__field--28051, .en__field.en__field--checkbox.en__field--871601.en__field--NOT_TAGGED_81, input[name="supporter.emailAddress"]',
//     fieldOptInSelectorTargetLocation: "after",
//     fieldClearSelectorTarget:
//       'label[for="en__field_supporter_firstName"], label[for="en__field_supporter_emailAddress"]',
//     fieldClearSelectorTargetLocation: "after",
//     fieldNames: [
//       "supporter.firstName",
//       "supporter.lastName",
//       "supporter.emailAddress",
//       "supporter.phoneNumber",
//       "supporter.address1",
//       "supporter.address2",
//       "supporter.city",
//       "supporter.region",
//       "supporter.postcode",
//       "supporter.country",
//     ],
//   };
// }
new App(options);
