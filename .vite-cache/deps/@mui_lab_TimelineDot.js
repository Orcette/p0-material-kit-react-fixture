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
import {
  capitalize_default
} from "./chunk-BA2GAMUZ.js";
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

// node_modules/@mui/lab/esm/TimelineDot/TimelineDot.js
var React = __toESM(require_react(), 1);
var import_prop_types = __toESM(require_prop_types(), 1);

// node_modules/@mui/lab/esm/TimelineDot/timelineDotClasses.js
function getTimelineDotUtilityClass(slot) {
  return generateUtilityClass("MuiTimelineDot", slot);
}
var timelineDotClasses = generateUtilityClasses("MuiTimelineDot", ["root", "filled", "outlined", "filledGrey", "outlinedGrey", "filledPrimary", "outlinedPrimary", "filledSecondary", "outlinedSecondary"]);
var timelineDotClasses_default = timelineDotClasses;

// node_modules/@mui/lab/esm/TimelineDot/TimelineDot.js
var import_jsx_runtime = __toESM(require_jsx_runtime(), 1);
var useUtilityClasses = (ownerState) => {
  const {
    color,
    variant,
    classes
  } = ownerState;
  const slots = {
    root: ["root", variant, color !== "inherit" && `${variant}${capitalize_default(color)}`]
  };
  return composeClasses(slots, getTimelineDotUtilityClass, classes);
};
var TimelineDotRoot = styled_default("span", {
  name: "MuiTimelineDot",
  slot: "Root",
  overridesResolver: (props, styles) => {
    const {
      ownerState
    } = props;
    return [styles.root, styles[ownerState.color !== "inherit" && `${ownerState.variant}${capitalize_default(ownerState.color)}`], styles[ownerState.variant]];
  }
})(({
  ownerState,
  theme
}) => ({
  display: "flex",
  alignSelf: "baseline",
  borderStyle: "solid",
  borderWidth: 2,
  padding: 4,
  borderRadius: "50%",
  boxShadow: (theme.vars || theme).shadows[1],
  margin: "11.5px 0",
  ...ownerState.variant === "filled" && {
    borderColor: "transparent",
    ...ownerState.color !== "inherit" && {
      ...ownerState.color === "grey" ? {
        color: (theme.vars || theme).palette.grey[50],
        backgroundColor: (theme.vars || theme).palette.grey[400]
      } : {
        color: (theme.vars || theme).palette[ownerState.color].contrastText,
        backgroundColor: (theme.vars || theme).palette[ownerState.color].main
      }
    }
  },
  ...ownerState.variant === "outlined" && {
    boxShadow: "none",
    backgroundColor: "transparent",
    ...ownerState.color !== "inherit" && {
      ...ownerState.color === "grey" ? {
        borderColor: (theme.vars || theme).palette.grey[400]
      } : {
        borderColor: (theme.vars || theme).palette[ownerState.color].main
      }
    }
  }
}));
var TimelineDot = React.forwardRef(function TimelineDot2(inProps, ref) {
  const props = useThemeProps({
    props: inProps,
    name: "MuiTimelineDot"
  });
  const {
    className,
    color = "grey",
    variant = "filled",
    ...other
  } = props;
  const ownerState = {
    ...props,
    color,
    variant
  };
  const classes = useUtilityClasses(ownerState);
  return (0, import_jsx_runtime.jsx)(TimelineDotRoot, {
    className: clsx_default(classes.root, className),
    ownerState,
    ref,
    ...other
  });
});
true ? TimelineDot.propTypes = {
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
   * The dot can have a different colors.
   * @default 'grey'
   */
  color: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["error", "grey", "info", "inherit", "primary", "secondary", "success", "warning"]), import_prop_types.default.string]),
  /**
   * The system prop that allows defining system overrides as well as additional CSS styles.
   */
  sx: import_prop_types.default.oneOfType([import_prop_types.default.arrayOf(import_prop_types.default.oneOfType([import_prop_types.default.func, import_prop_types.default.object, import_prop_types.default.bool])), import_prop_types.default.func, import_prop_types.default.object]),
  /**
   * The dot can appear filled or outlined.
   * @default 'filled'
   */
  variant: import_prop_types.default.oneOfType([import_prop_types.default.oneOf(["filled", "outlined"]), import_prop_types.default.string])
} : void 0;
var TimelineDot_default = TimelineDot;
export {
  TimelineDot_default as default,
  getTimelineDotUtilityClass,
  timelineDotClasses_default as timelineDotClasses
};
//# sourceMappingURL=@mui_lab_TimelineDot.js.map
