package com.example.archibald.ui.components

import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.CompassCalibration
import androidx.compose.material.icons.filled.Forum
import androidx.compose.material.icons.filled.Mic
import androidx.compose.material.icons.filled.Settings
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.scale
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import com.example.archibald.ui.theme.*

/**
 * Archibald Design System - Composable Bottom Navigation
 * Provides premium haptic navigation and futuristic active glow signals.
 */

enum class ArchibaldTab {
    CHAT, VOICE, PROJECTS, SETTINGS
}

@Composable
fun ArchibaldBottomNavigation(
    currentTab: ArchibaldTab,
    onTabSelected: (ArchibaldTab) -> Unit,
    modifier: Modifier = Modifier
) {
    // Elegant bottom container carrying a glassy overlay grid
    Box(
        modifier = modifier
            .fillMaxWidth()
            .height(Dimensions.BottomNavHeight)
            .background(
                Brush.verticalGradient(
                    colors = listOf(
                        Color(0xFF040B15).copy(alpha = 0.85f),
                        Color(0xFF010408).copy(alpha = 0.95f)
                    )
                )
            )
            .border(
                width = Dimensions.BorderMicro,
                color = CyanGlow.copy(alpha = 0.12f)
            )
    ) {
        Row(
            modifier = Modifier.fillMaxSize(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceEvenly
        ) {
            BottomTabItem(
                tab = ArchibaldTab.CHAT,
                icon = Icons.Default.Forum,
                label = "Chat",
                isSelected = currentTab == ArchibaldTab.CHAT,
                onClick = { onTabSelected(ArchibaldTab.CHAT) }
            )

            BottomTabItem(
                tab = ArchibaldTab.VOICE,
                icon = Icons.Default.Mic,
                label = "Vocal",
                isSelected = currentTab == ArchibaldTab.VOICE,
                onClick = { onTabSelected(ArchibaldTab.VOICE) }
            )

            BottomTabItem(
                tab = ArchibaldTab.PROJECTS,
                icon = Icons.Default.CompassCalibration,
                label = "Projets",
                isSelected = currentTab == ArchibaldTab.PROJECTS,
                onClick = { onTabSelected(ArchibaldTab.PROJECTS) }
            )

            BottomTabItem(
                tab = ArchibaldTab.SETTINGS,
                icon = Icons.Default.Settings,
                label = "Réglages",
                isSelected = currentTab == ArchibaldTab.SETTINGS,
                onClick = { onTabSelected(ArchibaldTab.SETTINGS) }
            )
        }
    }
}

@Composable
private fun BottomTabItem(
    tab: ArchibaldTab,
    icon: ImageVector,
    label: String,
    isSelected: Boolean,
    onClick: () -> Unit
) {
    val scaleFactor by animateFloatAsState(targetValue = if (isSelected) 1.2f else 1.0f, label = "TabScale")
    val activeColor = if (isSelected) CyanGlow else WhiteDim.copy(alpha = 0.5f)

    Column(
        modifier = Modifier
            .width(68.dp)
            .fillMaxHeight()
            .clickable { onClick() }
            .padding(top = Dimensions.SpaceSmall),
        horizontalAlignment = Alignment.CenterCenterHorizontally,
        verticalArrangement = Arrangement.Center
    ) {
        Box(
            contentAlignment = Alignment.Center,
            modifier = Modifier.scale(scaleFactor)
        ) {
            // Radial mini-flare behind the selected tab
            if (isSelected) {
                Box(
                    modifier = Modifier
                        .size(32.dp)
                        .background(CyanGlow.copy(alpha = 0.08f), CircleShape)
                )
            }
            Icon(
                imageVector = icon,
                contentDescription = label,
                tint = activeColor,
                modifier = Modifier.size(20.dp)
            )
        }
        
        Spacer(modifier = Modifier.height(Dimensions.SpaceTiny))
        
        Text(
            text = label,
            style = LabelStyle.copy(color = activeColor)
        )

        // Micro holographic dash indicator at the very bottom
        if (isSelected) {
            Box(
                modifier = Modifier
                    .padding(top = Dimensions.SpaceMicro)
                    .width(12.dp)
                    .height(1.5.dp)
                    .background(CyanGlow, CircleShape)
            )
        } else {
            Spacer(modifier = Modifier.height(3.5.dp))
        }
    }
}
