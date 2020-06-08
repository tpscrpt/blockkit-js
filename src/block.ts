import { MarkdownText, PlainText } from "./object";
import {
  ButtonElement,
  OverflowElement,
  PlainTextInputElement,
  SelectElement,
  MultiSelectElement,
  DatepickerElement,
  ImageElement,
} from "./element";
import { Element } from "./element";

export type BlockType = "section" | "input" | "image" | "file" | "divider" | "context" | "actions";

export interface Block {
  type: BlockType;
  /**
   * A string acting as a unique identifier for a block.
   * You can use this block_id when you receive an interaction payload to identify the source of the action.
   * If not specified, a block_id will be generated.
   * Maximum length for this field is 255 characters.
   */
  block_id?: string;
}

export interface ActionsBlock extends Block {
  type: "actions";
  /**
   * An array of interactive element objects - buttons, select menus, overflow menus, or date pickers.
   * There is a maximum of 5 elements in each action block.
   * @description NOTE: unclear whether this can take a multi select element, please verify independently.
   */
  elements: (
    | ButtonElement
    | SelectElement
    | MultiSelectElement
    | OverflowElement
    | DatepickerElement
  )[];
}

export interface ContextBlock extends Block {
  type: "context";
  /**
   * An array of image elements and text objects.
   * Maximum number of items is 10.
   */
  elements: (ImageElement | MarkdownText | PlainText)[];
}

export interface DividerBlock extends Block {
  type: "divider";
}

export interface FileBlock extends Block {
  type: "file";
  /**
   * The external unique ID for this file.
   */
  external_id: string;
  /**
   * At the moment, source will always be remote for a remote file.
   */
  source: string;
}

export interface ImageBlock extends Block {
  type: "image";
  /**
   * The URL of the image to be displayed.
   * Maximum length for this field is 3000 characters.
   */
  image_url: string;
  /**
   * A plain-text summary of the image.
   * This should not contain any markup.
   * Maximum length for this field is 2000 characters.
   */
  alt_text: string;
  /**
   * An optional title for the image in the form of a text object that can only be of type: plain_text.
   * Maximum length for the text in this field is 2000 characters.
   */
  title?: PlainText;
}

export interface InputBlock extends Block {
  type: "input";
  /**
   * A label that appears above an input element in the form of a text object that must have type of plain_text.
   * Maximum length for the text in this field is 2000 characters.
   */
  label: PlainText;
  /**
   * An plain-text input element, a select menu element, a multi-select menu element, or a datepicker.
   */
  element: PlainTextInputElement | SelectElement | MultiSelectElement | DatepickerElement;
  /**
   * An optional hint that appears below an input element in a lighter grey.
   * It must be a a text object with a type of plain_text.
   * Maximum length for the text in this field is 2000 characters.
   */
  hint?: PlainText;
  /**
   * A boolean that indicates whether the input element may be empty when a user submits the modal.
   * Defaults to false.
   */
  optional?: boolean;
}

interface BaseSectionBlock extends Block {
  type: "section";
  /**
   * One of the available element objects.
   */
  accessory?: Element;
}

export interface FieldsSectionBlock extends BaseSectionBlock {
  /**
   * The text for the block, in the form of a text object.
   * Maximum length for the text in this field is 3000 characters.
   * This field is not required if a valid array of fields objects is provided instead.
   */
  text?: MarkdownText | PlainText;
  /**
   * An array of text objects.
   * Any text objects included with fields will be rendered in a compact format that allows for 2 columns of side-by-side text.
   * Maximum number of items is 10.
   * Maximum length for the text in each item is 2000 characters.
   * [Click here for an example](https://api.slack.com/tools/block-kit-builder?blocks=%5B%0A%09%7B%0A%09%09%22type%22%3A%20%22section%22%2C%0A%09%09%22text%22%3A%20%7B%0A%09%09%09%22text%22%3A%20%22A%20message%20*with%20some%20bold%20text*%20and%20_some%20italicized%20text_.%22%2C%0A%09%09%09%22type%22%3A%20%22mrkdwn%22%0A%09%09%7D%2C%0A%09%09%22fields%22%3A%20%5B%0A%09%09%09%7B%0A%09%09%09%09%22type%22%3A%20%22mrkdwn%22%2C%0A%09%09%09%09%22text%22%3A%20%22*Priority*%22%0A%09%09%09%7D%2C%0A%09%09%09%7B%0A%09%09%09%09%22type%22%3A%20%22mrkdwn%22%2C%0A%09%09%09%09%22text%22%3A%20%22*Type*%22%0A%09%09%09%7D%2C%0A%09%09%09%7B%0A%09%09%09%09%22type%22%3A%20%22plain_text%22%2C%0A%09%09%09%09%22text%22%3A%20%22High%22%0A%09%09%09%7D%2C%0A%09%09%09%7B%0A%09%09%09%09%22type%22%3A%20%22plain_text%22%2C%0A%09%09%09%09%22text%22%3A%20%22String%22%0A%09%09%09%7D%0A%09%09%5D%0A%09%7D%0A%5D).
   */
  fields: (MarkdownText | PlainText)[];
}

export type SectionBlock =
  | FieldsSectionBlock
  | (BaseSectionBlock & {
      /**
       * The text for the block, in the form of a text object.
       * Maximum length for the text in this field is 3000 characters.
       * This field is not required if a valid array of fields objects is provided instead.
       */
      text: MarkdownText | PlainText;
      /**
       * An array of text objects.
       * Any text objects included with fields will be rendered in a compact format that allows for 2 columns of side-by-side text.
       * Maximum number of items is 10.
       * Maximum length for the text in each item is 2000 characters.
       * [Click here for an example](https://api.slack.com/tools/block-kit-builder?blocks=%5B%0A%09%7B%0A%09%09%22type%22%3A%20%22section%22%2C%0A%09%09%22text%22%3A%20%7B%0A%09%09%09%22text%22%3A%20%22A%20message%20*with%20some%20bold%20text*%20and%20_some%20italicized%20text_.%22%2C%0A%09%09%09%22type%22%3A%20%22mrkdwn%22%0A%09%09%7D%2C%0A%09%09%22fields%22%3A%20%5B%0A%09%09%09%7B%0A%09%09%09%09%22type%22%3A%20%22mrkdwn%22%2C%0A%09%09%09%09%22text%22%3A%20%22*Priority*%22%0A%09%09%09%7D%2C%0A%09%09%09%7B%0A%09%09%09%09%22type%22%3A%20%22mrkdwn%22%2C%0A%09%09%09%09%22text%22%3A%20%22*Type*%22%0A%09%09%09%7D%2C%0A%09%09%09%7B%0A%09%09%09%09%22type%22%3A%20%22plain_text%22%2C%0A%09%09%09%09%22text%22%3A%20%22High%22%0A%09%09%09%7D%2C%0A%09%09%09%7B%0A%09%09%09%09%22type%22%3A%20%22plain_text%22%2C%0A%09%09%09%09%22text%22%3A%20%22String%22%0A%09%09%09%7D%0A%09%09%5D%0A%09%7D%0A%5D).
       */
      fields?: (MarkdownText | PlainText)[];
    });
