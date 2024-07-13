import { verticalScale } from "react-native-size-matters"
import { colors } from "../../constants/colors"


export const base = {
  gap: '0.5rem',
  borderWidth: 2, 
  borderRadius: 12,
  alignItems: 'center',
  justifyContent: 'center'
}

export const small = {}
export const medium = {}
export const large = {}

export const standard = {
  borderColor: colors.tint,
  backgroundColor: colors.accent
}
export const outline = {
  borderColor: colors.accent,
}

export const circle = {}
export const square = {}

export const iconAtStart = {}
export const iconAtEnd = {}

export const scaleY = { paddingVertical: verticalScale(15) }
export const scaleX = {}

export const shadow = {
  shadowColor: '#000',
  shadowOpacity: .7,
  shadowRadius: .6,
  shadowOffset: {
    width: 1.5,
    height: 2
  }
}

export const none = {}