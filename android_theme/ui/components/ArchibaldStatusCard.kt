package com.example.archibald.ui.components

import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.archibald.ui.theme.*

/**
 * Archibald Design System - Composable Holographic Status Analyzer
 * Displays the holographic central avatar state and core active frequencies.
 */

enum class HologramState {
    IDLE, LISTENING, THINKING
}

@Composable
fun ArchibaldStatusCard(
    state: HologramState,
    modifier: Modifier = Modifier
) {
    // Endless pulse visual configurations
    val infiniteTransition = rememberInfiniteTransition(label = "pulse")
    val scaleFactor by infiniteTransition.animateFloat(
        initialValue = 0.95f,
        targetValue = 1.05f,
        animationSpec = infiniteRepeatable(
            animation = tween(1200, easing = LinearEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "corePulse"
    )

    val coreColor = when (state) {
        HologramState.IDLE -> CyanGlow
        HologramState.LISTENING -> Color(0xFF34D399) // Emerald state
        HologramState.THINKING -> Color(0xFFA78BFA)  // Purple state
    }

    val stateText = when (state) {
        HologramState.IDLE -> "VEILLE ACTIVE"
        HologramState.LISTENING -> "ÉCOUTE EN COURS..."
        HologramState.THINKING -> "MATRICE D'ANALYSE..."
    }

    Column(
        modifier = modifier
            .fillMaxWidth()
            .padding(vertical = Dimensions.SpaceMedium),
        horizontalAlignment = Alignment.CenterHorizontally
    ) {
        Box(
            modifier = Modifier
                .size(Dimensions.AvatarCoreSize)
                .scale(scaleFactor),
            contentAlignment = Alignment.Center
        ) {
            // Outer dynamic glowing wave aura
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .background(coreColor.copy(alpha = 0.05f), CircleShape)
                    .border(Dimensions.BorderMicro, coreColor.copy(alpha = 0.2f), CircleShape)
            )

            // Intermediary holographic compass orbit
            Box(
                modifier = Modifier
                    .size(Dimensions.AvatarCoreSize - 16.dp)
                    .background(coreColor.copy(alpha = 0.1f), CircleShape)
                    .border(Dimensions.BorderLaser, coreColor.copy(alpha = 0.4f), CircleShape)
            )

            // Inner sovereign laser physical core
            Box(
                modifier = Modifier
                    .size(Dimensions.AvatarCoreSize - 40.dp)
                    .background(
                        Brush.radialGradient(
                            colors = listOf(
                                coreColor.copy(alpha = 0.8f),
                                CosmicDark
                            )
                        ),
                        CircleShape
                    )
            ) {
                // Spinning micro anchor node inside center (represented simplified for rendering safety)
                Box(
                    modifier = Modifier
                        .size(8.dp)
                        .background(Color.White, CircleShape)
                        .align(Alignment.Center)
                )
            }
        }

        Spacer(modifier = Modifier.height(Dimensions.SpaceMedium))

        // Cyber status flag
        Row(
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.Center
        ) {
            Box(
                modifier = Modifier
                    .size(6.dp)
                    .background(coreColor, CircleShape)
            )
            Spacer(modifier = Modifier.width(Dimensions.SpaceSmall))
            Text(
                text = stateText,
                fontFamily = FontFamily.Monospace,
                fontWeight = FontWeight.Bold,
                fontSize = 10.sp,
                letterSpacing = 1.5.sp,
                color = coreColor
            )
        }
    }
}
