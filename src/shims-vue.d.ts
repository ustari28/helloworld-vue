declare module '*.vue' {
  import Vue from 'vue'
  export default Vue
}
/**
 * Load all json files like modules.
 */
declare module '*.json' {
  const value: any;
  export default value;
}