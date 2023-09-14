import { StyleColor } from "config/color";
import { CSSProperties, MouseEventHandler, ReactElement } from "react";
import styled from "styled-components";

interface IProps {
  title: string | number | string[] | number[] | ReactElement | ReactElement[];
  dataId?: string | number;
  value?: string | number;
  onClick?: MouseEventHandler | undefined;
  dynamic?: boolean;
  isActive?: boolean;
  style?: CSSProperties;
  activeColor?: string;
  disableColor?: string;
  alwaysHandling?: boolean;
}

interface Dynamic {
  isDynamic: boolean;
  isActive: boolean;
  isAlwaysHandling: boolean;
}

export default function DefaultButton({
  dataId,
  value,
  title,
  onClick,
  dynamic = false,
  alwaysHandling = false,
  isActive = true,
  style,
  activeColor = StyleColor.PRIMARY,
  disableColor = StyleColor.DISABLE,
}: IProps) {
  let isActiveHandling = null;

  if (alwaysHandling || !dynamic) {
    isActiveHandling = onClick;
  } else if (dynamic && isActive) {
    isActiveHandling = onClick;
  }

  return (
    <Button
      data-id={dataId}
      value={value}
      onClick={isActiveHandling}
      dynamic={{
        isDynamic: dynamic,
        isActive: isActive,
        isAlwaysHandling: alwaysHandling,
      }}
      style={style}
      activeColor={activeColor}
      disableColor={disableColor}
    >
      {title}
    </Button>
  );
}

const Button = styled.button<{
  dynamic: Dynamic;
  activeColor: string;
  disableColor: string;
}>`
  color: ${StyleColor.LIGHT};
  font-weight: 600;
  line-height: 1;
  font-size: 18px;
  height: 42px;
  width: 100%;
  box-shadow: ${StyleColor.DEEPSHADOW};
  border-radius: 8px;
  cursor: pointer;

  ${({ dynamic, activeColor, disableColor }) => {
    if (dynamic.isDynamic === true && dynamic.isActive === false) {
      if (!dynamic.isAlwaysHandling) {
        return `background: ${disableColor};
        border: 0;
        cursor:default;`;
      } else {
        return `background: ${disableColor};
        border: 0;`;
      }
    } else {
      return `background: ${activeColor};
      border: 1px solid ${StyleColor.BORDER};
      &:hover {
        background: ${StyleColor.PRIMARY};
        & * {
          color: ${StyleColor.LIGHT};
          fill:${StyleColor.LIGHT};
        }
      }
      `;
    }
  }}
`;
