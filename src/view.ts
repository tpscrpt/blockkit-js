import { Block } from "./block";
import { PlainText } from "./object";

export type ViewType = "modal" | "home";

export interface View {
  type: ViewType;
  /**
   * An array of blocks that defines the content of the view.
   * Max of 100 blocks.
   */
  blocks: Block[];
  /**
   * An optional string that will be sent to your app in view_submission and block_actions events.
   * Max length of 3000 characters.
   */
  private_metadata?: string;
  /**
   * An identifier to recognize interactions and submissions of this particular view.
   * Don't use this to store sensitive information (use private_metadata instead).
   * Max length of 255 characters.
   */
  callback_id?: string;
  /**
   * A custom identifier that must be unique for all views on a per-team basis.
   */
  external_id?: string;
}

export interface ModalView extends View {
  type: "modal";
  /**
   * The title that appears in the top-left of the modal.
   * Must be a plain_text text element with a max length of 24 characters.
   */
  title: PlainText;
  /**
   * An optional plain_text element that defines the text displayed in the close button at the bottom-right of the view.
   * Max length of 24 characters.
   */
  close?: PlainText;
  /**
   * An optional plain_text element that defines the text displayed in the submit button at the bottom-right of the view.
   * submit is required when an input block is within the blocks array.
   * Max length of 24 characters.
   */
  submit?: PlainText;
  /**
   * When set to true, clicking on the close button will clear all views in a modal and close it.
   * Defaults to false.
   */
  clear_on_close?: boolean;
  /**
   * Indicates whether Slack will send your request URL a view_closed event when a user clicks the close button.
   * Defaults to false.
   */
  notify_on_close?: boolean;
}

export interface HomeView extends View {
  type: "home";
}
