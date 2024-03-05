// This script allows you to set a window.EngridMonthlyAmounts object with custom amounts
// for the monthly donation frequency.
// Example:
// window.EngridMonthlyAmounts = {
//   amounts: {
//     "5": 5,
//     "15": 15,
//     "25": 25,
//     "30": 30,
//     "Other": "other",
//   },
//   default: 25,
// };
import {
  DonationAmount,
  DonationFrequency,
  ENGrid,
  EngridLogger,
} from "@4site/engrid-common";

export class MonthlyAmounts {
  private logger: EngridLogger = new EngridLogger(
    "MonthlyAmounts",
    "blueviolet",
    "aliceblue",
    "💰"
  );
  public _amount: DonationAmount = DonationAmount.getInstance();
  private _frequency: DonationFrequency = DonationFrequency.getInstance();
  private defaultChange: boolean = false;
  private swapped: boolean = false;
  private defaultAmounts:
    | { selected: boolean; label: string; value: any }[]
    | null = null;
  private loadCount: number = 0;
  constructor() {
    if (!this.shouldRun()) return;
    // Wait for EN to have altLists
    this.checkForAltLists();
  }
  checkForAltLists() {
    if (this.loadCount > 10) {
      this.logger.error("Unable to load altLists");
      return false;
    }
    if (
      ENGrid.checkNested(
        window.EngagingNetworks,
        "require",
        "_defined",
        "enjs",
        "dependencies",
        "altLists"
      ) &&
      Object.keys(
        (window as any).EngagingNetworks.require._defined.enjs.dependencies
          .altLists
      ).length > 0
    ) {
      this.logger.log(`AltLists Loaded attempt ${this.loadCount}`);
      this.run();
      return true;
    } else {
      this.loadCount++;
      setTimeout(() => this.checkForAltLists(), 200);
    }
  }
  run() {
    this.loadDefaultAmounts();
    this._frequency.onFrequencyChange.subscribe(() => this.setMonthlyAmounts());
    this._amount.onAmountChange.subscribe(() => {
      this.defaultChange = false;
      if (!this.swapped) return;
      // Check if the amount is not default amount for the frequency
      if (
        this._amount.amount != (window as any).EngridMonthlyAmounts.default &&
        this._frequency.frequency === "monthly"
      ) {
        this.defaultChange = true;
      }
    });
    this.setMonthlyAmounts();
  }
  setMonthlyAmounts() {
    if (this._frequency.frequency === "monthly") {
      (window as any).EngagingNetworks.require._defined.enjs.swapList(
        "donationAmt",
        this.loadEnAmounts((window as any).EngridMonthlyAmounts),
        {
          ignoreCurrentValue: this.ignoreCurrentValue(),
        }
      );
      this._amount.load();
      this.logger.log(
        "Amounts Swapped To",
        (window as any).EngridMonthlyAmounts
      );
      this.swapped = true;
    } else if (this.defaultAmounts) {
      (window as any).EngagingNetworks.require._defined.enjs.swapList(
        "donationAmt",
        this.defaultAmounts,
        {
          ignoreCurrentValue: this.ignoreCurrentValue(),
        }
      );
      this._amount.load();
      this.logger.log("Amounts Swapped To", this.defaultAmounts);
      this.swapped = true;
    }
  }
  loadEnAmounts(amountArray: { amounts: [string, number]; default: number }) {
    let ret = [];
    for (let amount in amountArray.amounts) {
      ret.push({
        selected: amountArray.amounts[amount] === amountArray.default,
        label: amount,
        value: amountArray.amounts[amount].toString(),
      });
    }
    return ret;
  }
  shouldRun() {
    return "EngridMonthlyAmounts" in window;
  }
  loadDefaultAmounts() {
    const amountContainer = document.querySelector(".en__field--donationAmt");
    if (!amountContainer) return;
    let amountID =
      [...amountContainer.classList.values()]
        .filter(
          (v) => v.startsWith("en__field--") && Number(v.substring(11)) > 0
        )
        .toString()
        .match(/\d/g)
        ?.join("") || "";
    if (!amountID) return;
    this.logger.log("Amount ID", amountID);
    if (
      (window as any).EngagingNetworks.suggestedGift &&
      "single" in (window as any).EngagingNetworks.suggestedGift
    ) {
      let defaultAmount = [];
      const single = (window as any).EngagingNetworks.suggestedGift.single;
      for (let amount in single) {
        if (single[amount].nextSuggestedGift) {
          defaultAmount.push({
            selected: true,
            label: single[amount].value.toString(),
            value: single[amount].value.toString(),
          });
        } else if (single[amount].value === -1) {
          // Other
          defaultAmount.push({
            selected: false,
            label: "Other",
            value: "other",
          });
        } else {
          defaultAmount.push({
            selected: false,
            label: single[amount].value.toString(),
            value: single[amount].value.toString(),
          });
        }
      }
      this.defaultAmounts = defaultAmount;
    } else if (
      (window as any).EngagingNetworks.require._defined.enjs.dependencies
        .altLists[amountID].alt0
    ) {
      this.defaultAmounts = (
        window as any
      ).EngagingNetworks.require._defined.enjs.dependencies.altLists[
        amountID
      ].alt0;
    }
  }
  ignoreCurrentValue() {
    return !(
      (
        window as any
      ).EngagingNetworks.require._defined.enjs.checkSubmissionFailed() ||
      ENGrid.getUrlParameter("transaction.donationAmt") !== null ||
      this.defaultChange
    );
  }
}
