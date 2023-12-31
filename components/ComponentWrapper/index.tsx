// @mui
import { Box, styled } from "@mui/system";
// next
import {
  ComponentType,
  forwardRef,
  PropsWithChildren,
  ReactNode,
  Ref,
} from "react";

const StyledBox = styled(Box)({
  // Add other common styles as needed
  // display: "flex",
  // flexDirection: "column",
  // alignItems: "center",
  // justifyContent: "center",
  // bgcolor: "background.default",
  // color: "text.primary",
  // p: 3,
  // gap: 15,
  paddingTop: "40px",
  minHeight: "calc(100vh - 88px)",
});

// const Page = forwardRef(({ Component, ...other }, ref) => (
//   <>
//     <StyledBox ref={ref} {...other}>
//       <Component />
//     </StyledBox>
//   </>
// ));
//
// export default Page;

type ComponentProps = {
  children?: ReactNode;
};

const Page = (Component: ComponentType<ComponentProps>) => {
  const WithPageStyles = (
    props: PropsWithChildren<ComponentProps>,
    ref: Ref<any>
  ) => (
    <StyledBox ref={ref} {...props}>
      <Component {...props} />
    </StyledBox>
  );

  return forwardRef(WithPageStyles);
};

export default Page;