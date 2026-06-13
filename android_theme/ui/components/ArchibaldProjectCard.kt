package com.example.archibald.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Book
import androidx.compose.material.icons.filled.DirectionsCar
import androidx.compose.material.icons.filled.Home
import androidx.compose.material.icons.filled.SmartToy
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.unit.dp
import com.example.archibald.ui.theme.*

/**
 * Archibald Design System - Archibald Project Cards
 * Provides standardized glassmorphic grid items detailing the user's active client workspaces.
 */

@Composable
fun ArchibaldProjectCard(
    name: String,
    activity: String,
    iconType: String,
    onClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    val (icon, color) = when (iconType.lowercase()) {
        "hector" -> Pair(Icons.Default.Home, Color(0xFF34D399))
        "archibald" -> Pair(Icons.Default.SmartToy, CyanGlow)
        "lecture" -> Pair(Icons.Default.Book, Color(0xFFC084FC))
        "ve" -> Pair(Icons.Default.DirectionsCar, Color(0xFFFBBF24))
        else -> Pair(Icons.Default.SmartToy, WhiteDim)
    }

    Row(
        modifier = modifier
            .fillMaxWidth()
            .background(
                Brush.horizontalGradient(
                    colors = listOf(
                        Color(0xFF071321).copy(alpha = 0.5f),
                        Color(0xFF040B15).copy(alpha = 0.1f)
                    )
                ),
                shape = CreativeShapes.ProjectCardShape
            )
            .border(
                width = Dimensions.BorderMicro,
                color = CyanGlow.copy(alpha = 0.12f),
                shape = CreativeShapes.ProjectCardShape
            )
            .clickable { onClick() }
            .padding(v = Dimensions.SpaceMedium, h = Dimensions.SpaceMedium),
        verticalAlignment = Alignment.CenterVertically,
        horizontalArrangement = Arrangement.SpaceBetween
    ) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = Modifier.weight(1f)
        ) {
            // Rounded cyber-framed square to hold the emblem
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .background(Color(0xFF0C1C2E).copy(alpha = 0.7f), CreativeShapes.ProjectCardShape)
                    .border(Dimensions.BorderMicro, Color.White.copy(alpha = 0.1f), CreativeShapes.ProjectCardShape),
                contentAlignment = Alignment.Center
            ) {
                Icon(
                    imageVector = icon,
                    contentDescription = name,
                    tint = color,
                    modifier = Modifier.size(18.dp)
                )
            }

            Spacer(modifier = Modifier.width(Dimensions.SpaceMedium))

            Column {
                Text(
                    text = name,
                    style = ProjectTitleStyle
                )
                Spacer(modifier = Modifier.height(2.dp))
                Text(
                    text = "Dernière modif. : $activity",
                    style = ProjectActivityStyle
                )
            }
        }

        // Holographic green signal active dot indicator
        Box(
            modifier = Modifier
                .size(7.dp)
                .background(CyanGlow.copy(alpha = 0.4f), CircleShape)
                .border(Dimensions.BorderMicro, CyanGlow, CircleShape)
        )
    }
}
