import {
  PlainText,
  MarkdownText,
  OptionObject,
  OptionGroup,
  OverflowOptionObject,
  ConfirmObject,
  FilterObject,
  RadioButtonOptionObject,
} from "./object";

export type ElementType =
  | "button"
  | "checkboxes"
  | "datepicker"
  | "image"
  | "multi_static_select"
  | "multi_external_select"
  | "multi_users_select"
  | "multi_conversations_select"
  | "multi_channels_select"
  | "overflow"
  | "plain_text_input"
  | "radio_buttons"
  | "static_select"
  | "external_select"
  | "users_select"
  | "conversations_select"
  | "channels_select";

interface BaseElement {
  type: ElementType;
}

export interface Element extends BaseElement {
  action_id: string;
}

export type UnactionableElement = BaseElement;

export interface ConfirmedElement extends Element {
  confirm?: ConfirmObject;
}

export interface IPlaceholder {
  /**
   * A plain_text only text object that defines the placeholder text shown in the plain-text input.
   * Maximum length for the text in this field is 150 characters.
   */
  placeholder: PlainText;
}

export type IOptionalPlaceholder = Partial<IPlaceholder>;

export interface ButtonElement extends Element {
  type: "button";
  /**
   * An identifier for this action.
   * You can use this when you receive an interaction payload to identify the source of the action.
   * Should be unique among all other action_ids used elsewhere by your app.
   * Maximum length for this field is 255 characters.
   */
  action_id: string;
  /**
   * A text object that defines the button's text.
   * Can only be of type: plain_text.
   * Maximum length for the text in this field is 75 characters.
   */
  text: PlainText;
  /**
   * A URL to load in the user's browser when the button is clicked.
   * Maximum length for this field is 3000 characters.
   * If you're using url, you'll still receive an interaction payload and will need to send an acknowledgement response.
   */
  url?: string;
  /**
   * The value to send along with the interaction payload.
   * Maximum length for this field is 2000 characters.
   */
  value?: string;
  /**
   * Decorates buttons with alternative visual color schemes. Use this option with restraint.
   *
   * primary gives buttons a green outline and text, ideal for affirmation or confirmation actions.
   * primary should only be used for one button within a set.
   *
   * danger gives buttons a red outline and text, and should be used when the action is destructive.
   * Use danger even more sparingly than primary.
   *
   * If you don't include this field, the default button style will be used.
   *
   * ![Three buttons showing default, primary, and danger color styles](https://a.slack-edge.com/80588/img/api/messaging/block_element_button_style.png)
   *
   * The image above shows the three different style options.
   */
  style?: "primary" | "danger";
}

export interface ImageElement extends UnactionableElement {
  type: "image";
  /**
   * The URL of the image to be displayed.
   */
  image_url: string;
  /**
   * A plain-text summary of the image.
   * This should not contain any markup.
   */
  alt_text: string;
}

export interface OverflowElement extends ConfirmedElement {
  type: "overflow";
  /**
   * An identifier for the action triggered when a menu option is selected.
   * You can use this when you receive an interaction payload to identify the source of the action.
   * Should be unique among all other action_ids used elsewhere by your app.
   * Maximum length for this field is 255 characters.
   */
  action_id: string;
  /**
   * An array of option objects to display in the menu.
   * Maximum number of options is 5, minimum is 2.
   */
  options: OverflowOptionObject[];
}

export interface PlainTextInputElement extends Element, IOptionalPlaceholder {
  type: "plain_text_input";
  /**
   * An identifier for the input value when the parent modal is submitted.
   * You can use this when you receive a view_submission payload to identify the value of the input element.
   * Should be unique among all other action_ids used elsewhere by your app.
   * Maximum length for this field is 255 characters.
   */
  action_id: string;
  /**
   * The initial value in the plain-text input when it is loaded.
   */
  initial_value?: string;
  /**
   * Indicates whether the input will be a single line (false) or a larger textarea (true).
   * Defaults to false.
   */
  multiline?: boolean;
  /**
   * The minimum length of input that the user must provide.
   * If the user provides less, they will receive an error.
   * Maximum value is 3000.
   */
  min_length?: number;
  /**
   * The maximum length of input that the user can provide.
   * If the user provides more, they will receive an error.
   */
  max_length?: number;
}

export interface RadioButtonsElement extends ConfirmedElement {
  type: "radio_buttons";
  /**
   * An identifier for the action triggered when the radio button group is changed.
   * You can use this when you receive an interaction payload to identify the source of the action.
   * Should be unique among all other action_ids used elsewhere by your app.
   * Maximum length for this field is 255 characters.
   */
  action_id: string;
  /**
   * An array of option objects.
   */
  options: RadioButtonOptionObject[];
  /**
   * An option object that exactly matches one of the options within options.
   * This option will be selected when the radio button group initially loads.
   */
  initial_options?: RadioButtonOptionObject[];
}

export interface CheckboxesElement extends ConfirmedElement {
  type: "checkboxes";
  /**
   * An identifier for the action triggered when the checkbox group is changed.
   * You can use this when you receive an interaction payload to identify the source of the action.
   * Should be unique among all other action_ids used elsewhere by your app.
   * Maximum length for this field is 255 characters.
   */
  action_id: string;
  /**
   * An array of option objects.
   */
  options: OptionObject<MarkdownText | PlainText>[];
  /**
   * An array of option objects that exactly matches one or more of the options within options.
   * These options will be selected when the checkbox group initially loads.
   */
  initial_options?: OptionObject<MarkdownText | PlainText>[];
}

export interface SelectElement extends ConfirmedElement, IPlaceholder {}

export interface ChannelsSelectElement extends SelectElement {
  type: "channels_select";
  /**
   * An identifier for the action triggered when a menu option is selected.
   * You can use this when you receive an interaction payload to identify the source of the action.
   * Should be unique among all other action_ids used elsewhere by your app.
   * Maximum length for this field is 255 characters.
   */
  action_id: string;
  /**
   * The ID of any valid public channel to be pre-selected when the menu loads.
   */
  initial_channel?: string;
  /**
   * **This field only works with menus in input blocks in modals.**
   *
   * When set to true, the view_submission payload from the menu's parent view will contain a response_url. This response_url can be used for message responses. The target channel for the message will be determined by the value of this select menu.
   */
  response_url_enabled?: boolean;
}

export interface ConversationsSelectElement extends SelectElement {
  type: "conversations_select";
  /**
   * An identifier for the action triggered when a menu option is selected.
   * You can use this when you receive an interaction payload to identify the source of the action.
   * Should be unique among all other action_ids used elsewhere by your app.
   * Maximum length for this field is 255 characters.
   */
  action_id: string;
  /**
   * The ID of any valid conversation to be pre-selected when the menu loads.
   */
  initial_conversation?: string;
  /**
   * Pre-populates the select menu with the conversation that the user was viewing when they opened the modal, if available.
   * If initial_conversation is also supplied, it will be ignored.
   * Default is false.
   */
  default_to_current_conversation?: boolean;
  /**
   * **This field only works with menus in input blocks in modals.**
   *
   * When set to true, the view_submission payload from the menu's parent view will contain a response_url.
   * This response_url can be used for message responses.
   * The target conversation for the message will be determined by the value of this select menu.
   */
  response_url_enabled?: boolean;
  /**
   * A filter object that reduces the list of available conversations using the specified criteria.
   */
  filter?: FilterObject;
}

export interface DatepickerElement extends ConfirmedElement, IOptionalPlaceholder {
  type: "datepicker";
  /**
   * An identifier for the action triggered when a menu option is selected.
   * You can use this when you receive an interaction payload to identify the source of the action.
   * Should be unique among all other action_ids used elsewhere by your app.
   * Maximum length for this field is 255 characters.
   */
  action_id: string;
  /**
   * The initial date that is selected when the element is loaded.
   * This should be in the format YYYY-MM-DD.
   */
  initial_date?: string;
}

export interface ExternalSelectElement extends SelectElement {
  type: "external_select";
  /**
   * An identifier for the action triggered when a menu option is selected.
   * You can use this when you receive an interaction payload to identify the source of the action.
   * Should be unique among all other action_ids used elsewhere by your app.
   * Maximum length for this field is 255 characters.
   */
  action_id: string;
  /**
   * A single option that exactly matches one of the options within the options or option_groups loaded from the external data source.
   * This option will be selected when the menu initially loads.
   */
  initial_option?: OptionObject<PlainText>;
  /**
   * When the typeahead field is used, a request will be sent on every character change.
   * If you prefer fewer requests or more fully ideated queries, use the min_query_length attribute to tell Slack the fewest number of typed characters required before dispatch.
   * The default value is 3.
   */
  min_query_length?: number;
}

export interface BaseStaticSelectElement extends SelectElement {
  type: "static_select";
  /**
   * An identifier for the action triggered when a menu option is selected.
   * You can use this when you receive an interaction payload to identify the source of the action.
   * Should be unique among all other action_ids used elsewhere by your app.
   * Maximum length for this field is 255 characters.
   */
  action_id: string;
  /**
   * A single option that exactly matches one of the options within options or option_groups.
   * This option will be selected when the menu initially loads.
   */
  initial_option?: OptionObject<PlainText>;
}

export interface StaticSelectElement extends SelectElement {
  /**
   * An array of option objects.
   * Maximum number of options is 100.
   * If option_groups is specified, this field should not be.
   */
  options: OptionObject<PlainText>[];
}

export interface GroupedStaticSelectElement extends SelectElement {
  /**
   * An array of option group objects.
   * Maximum number of option groups is 100.
   * If options is specified, this field should not be.
   */
  option_groups: OptionGroup<OptionObject<PlainText>>[];
}

export interface UsersSelectElement extends SelectElement {
  type: "users_select";
  /**
   * An identifier for the action triggered when a menu option is selected.
   * You can use this when you receive an interaction payload to identify the source of the action.
   * Should be unique among all other action_ids used elsewhere by your app.
   * Maximum length for this field is 255 characters.
   */
  action_id: string;
  /**
   * The user ID of any valid user to be pre-selected when the menu loads.
   */
  initial_user?: string;
}

export interface MultiSelectElement extends ConfirmedElement, IPlaceholder {
  /**
   * Specifies the maximum number of items that can be selected in the menu.
   * Minimum number is 1.
   */
  max_selected_items?: number;
}

export interface MultiChannelsSelectElement extends MultiSelectElement {
  type: "multi_channels_select";
  /**
   * An identifier for the action triggered when a menu option is selected.
   * You can use this when you receive an interaction payload to identify the source of the action.
   * Should be unique among all other action_ids used elsewhere by your app.
   * Maximum length for this field is 255 characters.
   */
  action_id: string;
  /**
   * An array of one or more IDs of any valid public channel to be pre-selected when the menu loads.
   */
  initial_channels?: string[];
}

export interface MultiConversationsSelectElement extends MultiSelectElement {
  type: "multi_conversations_select";
  /**
   * An identifier for the action triggered when a menu option is selected.
   * You can use this when you receive an interaction payload to identify the source of the action.
   * Should be unique among all other action_ids used elsewhere by your app.
   * Maximum length for this field is 255 characters.
   */
  action_id: string;
  /**
   * An array of one or more IDs of any valid conversations to be pre-selected when the menu loads.
   */
  initial_conversations?: string[];
  /**
   * Pre-populates the select menu with the conversation that the user was viewing when they opened the modal, if available.
   * If initial_conversations is also supplied, it will be ignored.
   * Default is false.
   */
  default_to_current_conversation?: boolean;
  /**
   * A filter object that reduces the list of available conversations using the specified criteria.
   */
  filter?: FilterObject;
}

export interface MultiExternalSelectElement extends MultiSelectElement {
  type: "multi_external_select";
  /**
   * An identifier for the action triggered when a menu option is selected.
   * You can use this when you receive an interaction payload to identify the source of the action.
   * Should be unique among all other action_ids used elsewhere by your app.
   * Maximum length for this field is 255 characters.
   */
  action_id: string;
  /**
   * When the typeahead field is used, a request will be sent on every character change.
   * If you prefer fewer requests or more fully ideated queries, use the min_query_length attribute to tell Slack the fewest number of typed characters required before dispatch.
   * The default value is 3.
   */
  min_query_length?: number;
  /**
   * An array of option objects that exactly match one or more of the options within options or option_groups.
   * These options will be selected when the menu initially loads.
   */
  initial_options?: OptionObject<PlainText>[];
}

export type MultiExternalSelectElementResponse =
  | { options: OptionObject<PlainText>[] }
  | { option_groups: OptionGroup<OptionObject<PlainText>> };

export interface BaseMultiStaticSelectElement extends MultiSelectElement {
  type: "multi_static_select";
  /**
   * An identifier for the action triggered when a menu option is selected.
   * You can use this when you receive an interaction payload to identify the source of the action.
   * Should be unique among all other action_ids used elsewhere by your app.
   * Maximum length for this field is 255 characters.
   */
  action_id: string;
  /**
   * An array of option objects that exactly match one or more of the options within options or option_groups.
   * These options will be selected when the menu initially loads.
   */
  initial_options?: OptionObject<PlainText>[];
}

export interface MultiStaticSelectElement extends BaseMultiStaticSelectElement {
  /**
   * An array of option objects.
   * Maximum number of options is 100.
   * If option_groups is specified, this field should not be.
   */
  options: OptionObject<PlainText>[];
}

export interface GropuedMultiStaticSelectElement extends BaseMultiStaticSelectElement {
  /**
   * An array of option group objects.
   * Maximum number of option groups is 100.
   * If options is specified, this field should not be.
   */
  option_groups: OptionGroup<OptionObject<PlainText>>[];
}

export interface MultiUsersSelectElement extends MultiSelectElement {
  type: "multi_users_select";
  /**
   * An identifier for the action triggered when a menu option is selected.
   * You can use this when you receive an interaction payload to identify the source of the action.
   * Should be unique among all other action_ids used elsewhere by your app.
   * Maximum length for this field is 255 characters.
   */
  action_id: string;
  /**
   * An array of user IDs of any valid users to be pre-selected when the menu loads.
   */
  initial_users?: string[];
}
