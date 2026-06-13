package com.example.archibald.ui.theme

import androidx.compose.material3.Typography
import androidx.compose.ui.text.TextStyle
import androidx.compose.ui.text.font.Font
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.text.style.TextGeometricTransform
import androidx.compose.ui.unit.sp

/**
 * Archibald Visual Identity - Typography Suite
 * Features "Inter" for readable micro-copy and "Space Grotesk" for futuristic displays.
 */

// Define standard font families. These scan to look for fonts from the Android resources dir (res/font/).
val InterFontFamily = FontFamily(
    // Ensure you copy 'inter_light.ttf', 'inter_regular.ttf', etc. into your app's res/font/ folder
    // Font(resId = R.font.inter_light, weight = FontWeight.Light),
    // Font(resId = R.font.inter_regular, weight = FontWeight.Normal),
    // Font(resId = R.font.inter_medium, weight = FontWeight.Medium),
    // Font(resId = R.font.inter_semibold, weight = FontWeight.SemiBold)
)

val SpaceGroteskFontFamily = FontFamily(
    // Ensure you copy 'space_grotesk_bold.ttf', etc. into your res/font/ folder
    // Font(resId = R.font.space_grotesk_medium, weight = FontWeight.Medium),
    // Font(resId = R.font.space_grotesk_bold, weight = FontWeight.Bold)
)

// Individual highly polished styles to style your Compose Composables directly
val UserMessageStyle = TextStyle(
    fontFamily = FontFamily.SansSerif, // InterFontFamily fallback
    fontWeight = FontWeight.Light,
    fontSize = 14.sp,
    lineHeight = 21.sp,
    color = TextWhite,
    letterSpacing = 0.15.sp
)

val ArchiMessageStyle = TextStyle(
    fontFamily = FontFamily.SansSerif, // InterFontFamily fallback
    fontWeight = FontWeight.Normal,
    fontSize = 14.sp,
    lineHeight = 22.sp,
    color = TextWhite,
    letterSpacing = 0.15.sp
)

val WaitingMessageStyle = TextStyle(
    fontFamily = FontFamily.SansSerif, // InterFontFamily fallback
    fontWeight = FontWeight.Medium,
    fontSize = 12.sp,
    color = CyanGlow,
    letterSpacing = (-0.1).sp
)

val HeaderTitleStyle = TextStyle(
    fontFamily = FontFamily.SansSerif, // SpaceGroteskFontFamily fallback
    fontWeight = FontWeight.Bold,
    fontSize = 25.sp,
    color = CyanGlow,
    letterSpacing = 3.75.sp // tracking-[0.15em] -> 25 * 0.15 = 3.75sp
)

val HeaderSubtitleStyle = TextStyle(
    fontFamily = FontFamily.SansSerif,
    fontWeight = FontWeight.SemiBold,
    fontSize = 8.sp,
    color = TextGlassMuted,
    letterSpacing = 3.28.sp, // tracking-[0.41em] -> 8 * 0.41 = 3.28sp
    textAlign = TextAlign.Center
)

val AuthorLabelStyle = TextStyle(
    fontFamily = FontFamily.SansSerif, // SpaceGroteskFontFamily fallback
    fontWeight = FontWeight.Bold,
    fontSize = 11.sp,
    color = CyanGlow,
    letterSpacing = 2.2.sp // tracking-widest -> 11 * 0.2 = 2.2sp
)

val TimestampStyle = TextStyle(
    fontFamily = FontFamily.Monospace,
    fontWeight = FontWeight.Normal,
    fontSize = 10.sp,
    color = TimestampMuted,
    letterSpacing = 1.sp
)

val TabLabelStyle = TextStyle(
    fontFamily = FontFamily.SansSerif,
    fontWeight = FontWeight.Bold,
    fontSize = 10.sp,
    letterSpacing = 0.8.sp
)

// Material 3 custom mappings for standard components
val ArchibaldTypography = Typography(
    bodyLarge = ArchiMessageStyle,
    bodyMedium = UserMessageStyle,
    labelLarge = TabLabelStyle,
    labelMedium = AuthorLabelStyle,
    titleLarge = HeaderTitleStyle,
    titleMedium = WaitingMessageStyle,
    labelSmall = TimestampStyle
)
