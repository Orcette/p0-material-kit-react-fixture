import {
  TimelineContext_default,
  convertTimelinePositionToClass
} from "./chunk-I35EFF2E.js";
import {
  useThemeProps
} from "./chunk-KDIVOCWF.js";
import "./chunk-GRDVXYJT.js";
import "./chunk-62AALHPD.js";
import "./chunk-JNKLIN6X.js";
import "./chunk-GWL7UYNJ.js";
import "./chunk-MYWNS7UG.js";
import "./chunk-GUTHYTUE.js";
import "./chunk-RDZXFWRD.js";
import "./chunk-2JF7AFBO.js";
import "./chunk-2BROX4BF.js";
import "./chunk-BA2GAMUZ.js";
import "./chunk-YDKNQEOL.js";
import "./chunk-XB6CBLFZ.js";
import "./chunk-OIDWDE2H.js";
import "./chunk-TQERBX44.js";
import "./chunk-YTZXCTPE.js";
import "./chunk-YECGMCBB.js";
import "./chunk-IUWP5UEL.js";
import {
  styled_default
} from "./chunk-VY26A3TE.js";
import "./chunk-RMQXXSQE.js";
import {
  require_jsx_runtime
} from "./chunk-J2CBX5S7.js";
import {
  clsx_default,
  composeClasses,
  generateUtilityClass,
  generateUtilityClasses
} from "./chunk-DBCKY6H7.js";
import {
  require_prop_types
} from "./chunk-ZM6LQ52J.js";
import {
  require_react
} from "./chunk-4X6FFAZQ.js";
import {
  __toESM
} from "./chunk-EWTE5DHJ.js";

// node_modules/@mui/lab/esm/Timeline/Timeline.js
var React = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);

// node_modules/@mui/lab/esm/Timeline/timelineClasses.js
function getTimelineUtilityClass(slot) {
  return generateUtilityClass("MuiTimeline", slot);
}
var timelineClasses = generateUtilityClasses("MuiTimeline", ["root", "positionLeft", "positionRight", "positionAlternate", "positionAlternateReverse"]);
var timelineClasses_default = timelineClasses;

// node_modules/@mui/lab/esm/Timeline/Timeline.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var useUtilityClasses = (ownerState) => {
  const {
    position,
    classes
  } = ownerState;
  const slots = {
    root: ["root", position && convertTimelinePositionToClass(position)]
  };
  return composeClasses(slots, getTimelineUtilityClass, classes);
};
var TimelineRoot = styled_default("ul", {
  name: "MuiTimeline",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, ownerState.position && styles[convertTimelinePositionToClass(ownerState.position)]];
  }
})({
  display: "flex",
  flexDirection: "column",
  padding: "6px 16px",
  flexGrow: 1
});
var Timeline = React.forwardRef(function Timeline2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiTimeline"
  });
  const {
    position = "right",
    className,
    ...other
  } = props;
  const ownerState = {
    ...props,
    position
  };
  const classes = useUtilityClasses(ownerState);
  const contextValue = React.useMemo(() => ({
    position
  }), [position]);
  return (0, import_jsx_runtime.jsx)(TimelineContext_default.Provider, {
    value: contextValue,
    children: (0, import_jsx_runtime.jsx)(TimelineRoot, {
      className: clsx_default(classes.root, className),
      ownerState,
      ref,
      ...other
    })
  });
});
true ? Timeline.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │ To update them, edit the TypeScript types and run `pnpm proptypes`. │
  // └─────────────────────────────────────────────────────────────────────┘
  /**
   * The content of the component.
   */
  children: import_prop_types.default.node,
  /**
   * Override or extend the styles applied to the component.
   */
  classes: import_prop_types.default.object,
  /**
   * className applied to the root element.
   */
  className: import_prop_types.default.string,
  /**
   * The position where the TimelineContent should appear relative to the time axis.
   * @default 'right'
   */
  position: import_prop_types.default.oneOf(["alternate-reverse", "alternate", "left", "right"]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var Timeline_default = Timeline;
export {
  Timeline_default as default,
  getTimelineUtilityClass,
  timelineClasses_default as timelineClasses
};
//# sourceMappingURL=@mui_lab_Timeline.js.map
