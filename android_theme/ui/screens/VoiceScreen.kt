package com.example.archibald.ui.screens

import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Mic
import androidx.compose.material.icons.filled.PowerSettingsNew
import androidx.compose.material.icons.filled.VolumeUp
import androidx.compose.material3.Icon
import androidx.compose.material3.Scaffold
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
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.archibald.ui.theme.*
import com.example.archibald.ui.components.*

/**
 * Archibald Design System - Composable Voice-Mode Screen
 * Displays realistic concentric wave animations simulating Archibald's voice processing loops.
 */

@Composable
fun VoiceScreen(
    currentTab: ArchibaldTab,
    onTabSelected: (ArchibaldTab) -> Unit,
    modifier: Modifier = Modifier
) {
    // Endless breath vocal animations
    val infiniteTransition = rememberInfiniteTransition(label = "pulse")
    val innerScale by infiniteTransition.animateFloat(
        initialValue = 0.9f,
        targetValue = 1.25f,
        animationSpec = infiniteRepeatable(
            animation = tween(1500, easing = FastOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "innerVoiceRipple"
    )

    val outerScale by infiniteTransition.animateFloat(
        initialValue = 1.0f,
        targetValue = 1.6f,
        animationSpec = infiniteRepeatable(
            animation = tween(1500, easing = LinearOutSlowInEasing),
            repeatMode = RepeatMode.Reverse
        ),
        label = "outerVoiceRipple"
    )

    Scaffold(
        topBar = {
            ArchibaldTopBar(
                onMenuClick = { /* No drawer needed */ },
                title = "CANAL ACOUSTIQUE"
            )
        },
        bottomBar = {
            ArchibaldBottomNavigation(
                currentTab = currentTab,
                onTabSelected = onTabSelected
            )
        },
        containerColor = Color.Transparent,
        modifier = modifier
            .fillMaxSize()
            .background(
                Brush.verticalGradient(
                    colors = listOf(
                        Color(0xFF030911),
                        Color(0xFF010408)
                    )
                )
            )
    ) { paddingValues ->
        Column(
            modifier = Modifier
                .fillMaxSize()
                .padding(paddingValues)
                .padding(horizontal = Dimensions.SpaceLarge),
            verticalArrangement = Arrangement.SpaceBetween,
            horizontalAlignment = Alignment.CenterHorizontally
        ) {
            Spacer(modifier = Modifier.height(Dimensions.SpaceLarge))

            // Upper Title / Mode Indicator
            Column(horizontalAlignment = Alignment.CenterHorizontally) {
                Text(
                    text = "CANAL SÉCURISÉ",
                    fontFamily = FontFamily.Monospace,
                    fontWeight = FontWeight.Bold,
                    fontSize = 11.sp,
                    letterSpacing = 2.sp,
                    color = CyanGlow
                )
                Spacer(modifier = Modifier.height(Dimensions.SpaceTiny))
                Text(
                    text = "Archibald est à votre écoute attentive...",
                    style = ProjectActivityStyle.copy(fontSize = 12.sp),
                    textAlign = TextAlign.Center
                )
            }

            // Central Massive Soundwave Transmitter
            Box(
                modifier = Modifier
                    .size(240.dp),
                contentAlignment = Alignment.Center
            ) {
                // Large outermost sonic circle
                Box(
                    modifier = Modifier
                        .fillMaxSize()
                        .scale(outerScale)
                        .background(CyanGlow.copy(alpha = 0.02f), CircleShape)
                        .border(Dimensions.BorderMicro, CyanGlow.copy(alpha = 0.1f), CircleShape)
                )

                // Intermediary concentric ripple
                Box(
                    modifier = Modifier
                        .size(180.dp)
                        .scale(innerScale)
                        .background(CyanGlow.copy(alpha = 0.05f), CircleShape)
                        .border(Dimensions.BorderLaser, CyanGlow.copy(alpha = 0.2f), CircleShape)
                )

                // Intrinsic sovereign glowing mic core
                Box(
                    modifier = Modifier
                        .size(110.dp)
                        .background(
                            Brush.linearGradient(
                                colors = listOf(
                                    Color(0xFF0C1D33),
                                    Color(0xFF040A12)
                                )
                            ),
                            CircleShape
                        )
                        .border(2.dp, CyanGlow, CircleShape),
                    contentAlignment = Alignment.Center
                ) {
                    Icon(
                        imageVector = Icons.Default.Mic,
                        contentDescription = "Active Microphone",
                        tint = CyanGlow,
                        modifier = Modifier.size(42.dp)
                    )
                }
            }

            // Lower Action Command Center
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier.padding(bottom = Dimensions.SpaceExtraLarge)
            ) {
                // Interactive Status Card
                Row(
                    modifier = Modifier
                        .background(Color.White.copy(alpha = 0.03f), CreativeShapes.PillShape)
                        .border(Dimensions.BorderMicro, Color.White.copy(alpha = 0.08f), CreativeShapes.PillShape)
                        .padding(v = Dimensions.SpaceSmall, h = Dimensions.SpaceLarge),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    Box(
                        modifier = Modifier
                            .size(6.dp)
                            .background(Color(0xFF34D399), CircleShape)
                    )
                    Spacer(modifier = Modifier.width(Dimensions.SpaceSmall))
                    Text(
                        text = "FRÉQUENCE SYNCHRONISÉE : HIERARCHY-HOLO",
                        fontFamily = FontFamily.Monospace,
                        fontWeight = FontWeight.Bold,
                        fontSize = 8.sp,
                        letterSpacing = 1.sp,
                        color = Color.White.copy(alpha = 0.6f)
                    )
                }

                Spacer(modifier = Modifier.height(Dimensions.SpaceLarge))

                // Mute and End vocal session actions
                Row(
                    horizontalArrangement = Arrangement.spacedBy(Dimensions.SpaceLarge),
                    verticalAlignment = Alignment.CenterVertically
                ) {
                    IconButton(
                        onClick = { /* Toggle Speaker output */ },
                        modifier = Modifier
                            .size(48.dp)
                            .background(Color.White.copy(alpha = 0.04f), CircleShape)
                            .border(Dimensions.BorderMicro, Color.White.copy(alpha = 0.12f), CircleShape)
                    ) {
                        Icon(
                            imageVector = Icons.Default.VolumeUp,
                            contentDescription = "Mute",
                            tint = Color.White.copy(alpha = 0.8f),
                            modifier = Modifier.size(18.dp)
                        )
                    }

                    IconButton(
                        onClick = { onTabSelected(ArchibaldTab.CHAT) },
                        modifier = Modifier
                            .size(56.dp)
                            .background(Color(0xFFEF4444).copy(alpha = 0.15f), CircleShape)
                            .border(Dimensions.BorderLaser, Color(0xFFEF4444), CircleShape)
                    ) {
                        Icon(
                            imageVector = Icons.Default.PowerSettingsNew,
                            contentDescription = "Arrêter session",
                            tint = Color(0xFFEF4444),
                            modifier = Modifier.size(22.dp)
                        )
                    }
                }
            }
        }
    }
}
