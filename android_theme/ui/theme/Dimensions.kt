package com.example.archibald.ui.theme

import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

/**
 * Archibald Design System - Dimensions
 * Maintains density-independent spacing, padding, laser borders, and elevation.
 */
object Dimensions {
    // Laser borders thickness
    val BorderLaser: Dp = 1.dp
    val BorderMicro: Dp = 0.5.dp

    // Margin / Grid Spacing
    val SpaceNone: Dp = 0.dp
    val SpaceMicro: Dp = 2.dp
    val SpaceTiny: Dp = 4.dp
    val SpaceSmall: Dp = 8.dp
    val SpaceMedium: Dp = 12.dp
    val SpaceLarge: Dp = 16.dp
    val SpaceExtraLarge: Dp = 24.dp
    val SpaceDoubleLarge: Dp = 32.dp

    // Element-specific Sizing
    val ChatBubblePaddingHorizontal = 20.dp
    val ChatBubblePaddingVertical = 12.dp
    val InputAreaHeight = 56.dp
    val HeaderHeight = 56.dp
    val BottomNavHeight = 64.dp
    
    // Core Avatar and Hologram Sizes
    val AvatarCoreSize = 96.dp
    val AvatarBubbleSize = 60.dp
    val SatelliteSize = 6.dp
    val SidebarWidth = 320.dp
}
