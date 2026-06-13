package com.example.archibald.ui.theme

import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.Shapes
import androidx.compose.ui.unit.dp

/**
 * Archibald Design System - Structural Shapes
 * Transcribes the high-radius organic glass bubble states and sleek rounded cards
 * from our futuristic cyberpunk interface.
 */
val ArchibaldShapes = Shapes(
    small = RoundedCornerShape(8.dp),
    medium = RoundedCornerShape(16.dp),
    large = RoundedCornerShape(24.dp),
    extraLarge = RoundedCornerShape(32.dp)
)

// Specific organic cyber shapes matching exactly our web-design structures
object CreativeShapes {
    // Highly asymmetric bubble styling for Archi response bubble (top-left is standard crisp corner to match user avatar link)
    val ArchiBubbleShape = RoundedCornerShape(
        topStart = 6.dp, 
        bottomStart = 24.dp, 
        bottomEnd = 24.dp, 
        topEnd = 24.dp
    )

    // Asymmetric bubble styling for user prompts
    val UserBubbleShape = RoundedCornerShape(
        topStart = 24.dp, 
        bottomStart = 24.dp, 
        bottomEnd = 24.dp, 
        topEnd = 6.dp
    )

    // Perfectly rounded capsule for glass components such as the searching panel, voice waves, and the control input
    val PillShape = RoundedCornerShape(100.dp)
    
    // Slanted project card shape
    val ProjectCardShape = RoundedCornerShape(16.dp)
}
