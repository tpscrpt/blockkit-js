import { Block } from "./block";

export interface FieldObject {
  /**
   * Shown as a bold heading displayed in the field object.
   * It cannot contain markup and will be escaped for you.
   */
  title?: string;
  /**
   * The text value displayed in the field object.
   * It can be formatted as plain text, or with mrkdwn by using the mrkdwn_in option.
   */
  value?: string;
  /**
   * Indicates whether the field object is short enough to be displayed side-by-side with other field objects.
   * Defaults to false.
   */
  short?: boolean;
}

type HexColorCode = string;

export type ColorType = "good" | "warning" | "danger" | HexColorCode;

export interface BaseLegacySecondaryAttachment {
  /**
   * A valid URL that displays a small 16px by 16px image to the left of the author_name text.
   * Will only work if author_name is present.
   */
  author_icon?: string;
  /**
   * A valid URL that will hyperlink the author_name text.
   * Will only work if author_name is present.
   */
  author_link?: string;
  /**
   * Small text used to display the author's name.
   */
  author_name?: string;
  /**
   * An array of field objects that get displayed in a table-like way (See the example above).
   * For best results, include no more than 2-3 field objects.
   */
  fields?: FieldObject[];
  /**
   * Some brief text to help contextualize and identify an attachment.
   * Limited to 300 characters, and may be truncated further when displayed to users in environments with limited screen real estate.
   */
  footer?: string;
  /**
   * A valid URL to an image file that will be displayed beside the footer text.
   * Will only work if author_name is present.
   * We'll render what you provide at 16px by 16px.
   * It's best to use an image that is similarly sized.
   */
  footer_icon?: string;
  /**
   * A valid URL to an image file that will be displayed at the bottom of the attachment.
   * We support GIF, JPEG, PNG, and BMP formats.
   *
   * Large images will be resized to a maximum width of 360px or a maximum height of 500px, while still maintaining the original aspect ratio.
   * Cannot be used with thumb_url.
   */
  image_url?: string;
  /**
   * An array of field names that should be formatted by mrkdwn syntax.
   */
  mrkdwn_in?: string[];
  /**
   * Text that appears above the message attachment block.
   * It can be formatted as plain text, or with mrkdwn by including it in the mrkdwn_in field.
   */
  pretext?: string;
  /**
   * A valid URL to an image file that will be displayed as a thumbnail on the right side of a message attachment.
   * We currently support the following formats: GIF, JPEG, PNG, and BMP.
   *
   * The thumbnail's longest dimension will be scaled down to 75px while maintaining the aspect ratio of the image.
   * The filesize of the image must also be less than 500 KB.
   */
  thumb_url?: string;
  /**
   * Large title text near the top of the attachment.
   */
  title?: string;
  /**
   * A valid URL that turns the title text into a hyperlink.
   */
  title_link?: string;
  /**
   * An integer Unix timestamp that is used to related your attachment to a specific time.
   * The attachment will display the additional timestamp value as part of the attachment's footer.
   *
   * Your message's timestamp will be displayed in varying ways, depending on how far in the past or future it is, relative to the present.
   * Form factors, like mobile versus desktop may also transform its rendered appearance.
   */
  ts?: number;
}

export type LegacySecondaryAttachment = (
  | {
      /**
       * A plain text summary of the attachment used in clients that don't show formatted text (eg. IRC, mobile notifications).
       */
      fallback: string;
      /**
       * The main body text of the attachment. It can be formatted as plain text, or with mrkdwn by including it in the mrkdwn_in field.
       * The content will automatically collapse if it contains 700+ characters or 5+ linebreaks, and will display a "Show more..." link to expand the content.
       */
      text?: string;
    }
  | {
      /**
       * A plain text summary of the attachment used in clients that don't show formatted text (eg. IRC, mobile notifications).
       */
      fallback?: string;
      /**
       * The main body text of the attachment. It can be formatted as plain text, or with mrkdwn by including it in the mrkdwn_in field.
       * The content will automatically collapse if it contains 700+ characters or 5+ linebreaks, and will display a "Show more..." link to expand the content.
       */
      text: string;
    }
) &
  BaseLegacySecondaryAttachment;

export interface ModernSecondaryAttachment extends BaseLegacySecondaryAttachment {
  /**
   * An array of layout blocks in the same format as described in the building blocks guide.
   */
  blocks: Block[];
}

export type SecondaryAttachment = {
  /**
   * Changes the color of the border on the left side of this attachment from the default gray.
   * Can either be one of good (green), warning (yellow), danger (red), or any hex color code (eg. #439FE0)
   */
  color?: ColorType;
} & (ModernSecondaryAttachment | LegacySecondaryAttachment);

export interface BaseMessage {
  /**
   * The ID of another un-threaded message to reply to.
   */
  thread_ts?: string;
  /**
   * Determines whether the text field is rendered according to mrkdwn formatting or not.
   * Defaults to true.
   */
  mrkdwn?: boolean;
}

export interface BlocksMessage extends BaseMessage {
  /**
   * The usage of this field changes depending on whether you're using blocks or not.
   * If you are, this is used as a fallback string to display in notifications.
   * If you aren't, this is the main body text of the message.
   * It can be formatted as plain text, or with mrkdwn.
   * This field is not enforced as required when using blocks, however it is highly recommended that you include it as the aforementioned fallback.
   */
  text?: string;
  /**
   * An array of layout blocks in the same format as described in the building blocks guide.
   */
  blocks: Block[];
}

export interface LegacyMessage extends BaseMessage {
  /**
   * The usage of this field changes depending on whether you're using blocks or not.
   * If you are, this is used as a fallback string to display in notifications.
   * If you aren't, this is the main body text of the message.
   * It can be formatted as plain text, or with mrkdwn.
   * This field is not enforced as required when using blocks, however it is highly recommended that you include it as the aforementioned fallback.
   */
  text: string;
  /**
   * An array of legacy secondary attachments.
   * We recommend you use blocks instead.
   */
  attachments: SecondaryAttachment[];
}

export type Message = BlocksMessage | LegacyMessage;

export type SendMessage = Message & {
  channel: string;
};
