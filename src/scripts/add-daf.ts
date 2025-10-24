// This script adds a DAF payment option to the donation form, only if the DAF payment option is available.
import {
  EngridLogger,
  ENGrid,
  ShowHideRadioCheckboxes,
} from "@4site/engrid-scripts";

export class AddDAF {
  private logger: EngridLogger = new EngridLogger(
    "AddDAF",
    "lightgray",
    "darkblue",
    "🪙"
  );
  private donorAdvisedFundButtonContainer = document.getElementById(
    "en__digitalWallet__chariot__container"
  );
  constructor() {
    if (!this.shouldRun()) return;
    if (this.donorAdvisedFundButtonContainer?.querySelector("*")) {
      this.addDAF();
    } else {
      this.checkForDafBeingAdded();
    }
  }

  shouldRun() {
    return !!this.donorAdvisedFundButtonContainer;
  }
  private checkForDafBeingAdded() {
    const donorAdvisedFundButtonContainer = document.getElementById(
      "en__digitalWallet__chariot__container"
    );
    if (!donorAdvisedFundButtonContainer) {
      this.logger.log("No DAF container found");
      return;
    }
    const callback = (
      mutationList: Array<MutationRecord>,
      observer: MutationObserver
    ) => {
      for (const mutation of mutationList) {
        //Once a child node has been added, set up the appropriate digital wallet
        if (mutation.type === "childList" && mutation.addedNodes.length) {
          this.addDAF();
          //Disconnect observer to prevent multiple additions
          observer.disconnect();
        }
      }
    };

    const observer = new MutationObserver(callback);
    observer.observe(donorAdvisedFundButtonContainer, {
      childList: true,
      subtree: true,
    });
  }
  private addDAF() {
    // Check if DAF is already added to the payment options
    const dafPaymentOption = document.querySelector(
      "input[name='transaction.giveBySelect'][value='daf']"
    ) as HTMLDivElement;
    if (dafPaymentOption) {
      this.logger.log("DAF already added");
      return;
    }
    this.logger.log("Adding DAF");
    const giveBySelectWrapper = document.querySelector(
      ".give-by-select .en__field__element--radio"
    ) as HTMLDivElement;
    if (!giveBySelectWrapper) {
      this.logger.log("No giveBySelectWrapper found");
      return;
    }
    const dafPaymentButton = `
    <!-- DAF (added dynamically) -->
      <div class="en__field__item en__field--giveBySelect give-by-select pseudo-en-field show-USD showif-daf-available recurring-frequency-y-hide daf">
        <input class="en__field__input en__field__input--radio" id="en__field_transaction_giveBySelectDAF" name="transaction.giveBySelect" type="radio" value="daf">
        <label class="en__field__label en__field__label--item" for="en__field_transaction_giveBySelectDAF">
          <img alt="DAF Logo" class="daf-logo" src="https://aaf1a18515da0e792f78-c27fdabe952dfc357fe25ebf5c8897ee.ssl.cf5.rackcdn.com/1839/daf-logo.png">
        </label>
      </div>
    `;
    // Add the DAF payment option to the payment options, before Credit Card
    giveBySelectWrapper.insertAdjacentHTML("beforeend", dafPaymentButton);
    // Add hide-if-daf-selected class to the premium gift container
    const premiumGiftContainer = document.querySelector(
      ".en__component--premiumgiftblock"
    ) as HTMLElement;
    if (premiumGiftContainer) {
      premiumGiftContainer.classList.add("hideif-daf-selected");
    }
    new ShowHideRadioCheckboxes("transaction.giveBySelect", "giveBySelect-");
    this.logger.log("DAF added");
    // Set the on change event for the DAF payment option
    const dafOption = document.querySelector(
      "input[name='transaction.giveBySelect'][value='daf']"
    ) as HTMLDivElement;
    if (!dafOption) {
      this.logger.log("Somehow DAF was not added");
      return;
    }
    dafOption.addEventListener("change", () => {
      this.logger.log("Payment DAF selected");
      ENGrid.setPaymentType("daf");
      // Uncheck the fee cover option with a ghost click
      const feeCoverLabel = document.querySelector(
        "label[for='en__field_transaction_feeCover']"
      ) as HTMLLabelElement;
      if (feeCoverLabel) {
        feeCoverLabel.click();
      }
    });
  }
}
