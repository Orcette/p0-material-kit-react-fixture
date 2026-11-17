import {
  Typography_default
} from "./chunk-NGFR2EQU.js";
import {
  TimelineContext_default,
  convertTimelinePositionToClass
} from "./chunk-I35EFF2E.js";
import {
  useThemeProps
} from "./chunk-KDIVOCWF.js";
import {
  styled_default
} from "./chunk-VY26A3TE.js";
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

// node_modules/@mui/lab/esm/TimelineContent/TimelineContent.js
var React = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);

// node_modules/@mui/lab/esm/TimelineContent/timelineContentClasses.js
function getTimelineContentUtilityClass(slot) {
  return generateUtilityClass("MuiTimelineContent", slot);
}
var timelineContentClasses = generateUtilityClasses("MuiTimelineContent", ["root", "positionLeft", "positionRight", "positionAlternate", "positionAlternateReverse"]);
var timelineContentClasses_default = timelineContentClasses;

// node_modules/@mui/lab/esm/TimelineContent/TimelineContent.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var useUtilityClasses = (ownerState) => {
  const {
    position,
    classes
  } = ownerState;
  const slots = {
    root: ["root", convertTimelinePositionToClass(position)]
  };
  return composeClasses(slots, getTimelineContentUtilityClass, classes);
};
var TimelineContentRoot = styled_default(Typography_default, {
  name: "MuiTimelineContent",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[convertTimelinePositionToClass(ownerState.position)]];
  }
})(({
  ownerState
}) => ({
  flex: 1,
  padding: "6px 16px",
  textAlign: "left",
  ...ownerState.position === "left" && {
    textAlign: "right"
  }
}));
var TimelineContent = React.forwardRef(function TimelineContent2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiTimelineContent"
  });
  const {
    className,
    ...other
  } = props;
  const {
    position: positionContext
  } = React.useContext(TimelineContext_default);
  const ownerState = {
    ...props,
    position: positionContext || "right"
  };
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsx)(TimelineContentRoot, {
    component: "div",
    className: clsx_default(classes.root, className),
    ownerState,
    ref,
    ...other
  });
});
true ? TimelineContent.propTypes = {
  // ┌────────────────────────────── Warning ──────────────────────────────┐
  // │ These PropTypes are generated from the TypeScript type definitions. │
  // │    To update them, edit the d.ts file and run `pnpm proptypes`.     │
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
   * @ignore
   */
  className: import_prop_types.default.string,
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object])
} : void 0;
var TimelineContent_default = TimelineContent;

export {
  getTimelineContentUtilityClass,
  timelineContentClasses_default,
  TimelineContent_default
};
//# sourceMappingURL=chunk-CF2J6LOX.js.map
