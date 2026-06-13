package com.example.archibald.ui.theme

import androidx.compose.foundation.isSystemInDarkTheme
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.darkColorScheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.CompositionLocalProvider
import androidx.compose.runtime.Immutable
import androidx.compose.runtime.staticCompositionLocalOf
import androidx.compose.ui.graphics.Color

/**
 * Archibald Advanced Holographic Custom Colors Extension
 * Allows Jetpack Compose developers to seamlessly query custom neon and laser opacities using:
 * "MaterialTheme.holographicColors.cyanGlow" anywhere in their layouts.
 */
@Immutable
data class HolographicColors(
    val bgDark: Color = CosmicDark,
    val cyanGlow: Color = CyanGlow,
    val blueGlow: Color = BlueGlow,
    val roseGlow: Color = RoseGlow,
    val emeraldGlow: Color = EmeraldGlow,
    val userChatBg: Color = UserChatBg,
    val archiChatBg: Color = ArchiChatBg,
    val glassPanelBg: Color = GlassPanelBg,
    val laserBorderCyan: Color = LaserBorderCyan,
    val laserBorderWhite: Color = LaserBorderWhite,
    val textWhite: Color = TextWhite,
    val textGlassMuted: Color = TextGlassMuted,
    val textGlassMutedDim: Color = TextGlassMutedDim,
    val timestampMuted: Color = TimestampMuted,
    val activeDotGlowing: Color = ActiveDotGlowing
)

val LocalHolographicColors = staticCompositionLocalOf { HolographicColors() }

// Master Material 3 color mapping
private val ArchibaldDarkColorScheme = darkColorScheme(
    primary = CyanGlow,
    onPrimary = CosmicDark,
    primaryContainer = UserChatBg,
    onPrimaryContainer = TextWhite,
    secondary = BlueGlow,
    background = CosmicDark,
    onBackground = TextWhite,
    surface = ArchiChatBg,
    onSurface = TextWhite,
    surfaceVariant = GlassPanelBg,
    onSurfaceVariant = TextGlassMuted,
    outline = LaserBorderCyan
)

@Composable
fun ArchibaldTheme(
    darkTheme: Boolean = isSystemInDarkTheme(), // Custom dark theme default (recommends dark mode for pure cyber aesthetic)
    content: @Composable () -> Unit
) {
    // Provide our custom cyberpunk/holographic colors down the composition tree
    val holoColors = HolographicColors()

    CompositionLocalProvider(
        LocalHolographicColors provides holoColors
    ) {
        MaterialTheme(
            colorScheme = ArchibaldDarkColorScheme,
            typography = ArchibaldTypography,
            content = content
        )
    }
}

/**
 * Handy extension utility to resolve holographic custom tokens quickly in code
 */
val MaterialTheme.holographicColors: HolographicColors
    @Composable
    get() = LocalHolographicColors.current
