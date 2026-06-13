package com.example.archibald.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ChevronRight
import androidx.compose.material.icons.filled.Menu
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.archibald.ui.theme.*

/**
 * Archibald Design System - Composable Top App Bar
 * Houses organic holographic titles and the hamburger menu entry key.
 */

@Composable
fun ArchibaldTopBar(
    onMenuClick: () -> Unit,
    modifier: Modifier = Modifier,
    title: String = "ARCHIBALD",
    subtitle: String = "MAJORDOME CYBERNÉTIQUE"
) {
    Box(
        modifier = modifier
            .fillMaxWidth()
            .height(Dimensions.HeaderHeight)
            .background(CosmicDark.copy(alpha = 0.5f))
            .padding(horizontal = Dimensions.SpaceLarge),
        contentAlignment = Alignment.Center
    ) {
        // Left action aligned: Sliding drawer activator
        Row(
            modifier = Modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically,
            horizontalArrangement = Arrangement.SpaceBetween
        ) {
            IconButton(
                onClick = onMenuClick,
                modifier = Modifier
                    .size(40.dp)
                    .background(Color.White.copy(alpha = 0.04f), CircleShape)
                    .border(Dimensions.BorderMicro, WhiteDim.copy(alpha = 0.15f), CircleShape)
            ) {
                Icon(
                    imageVector = Icons.Default.Menu,
                    contentDescription = "Ouvrir le menu",
                    tint = Color.White.copy(alpha = 0.8f),
                    modifier = Modifier.size(18.dp)
                )
            }

            // Right slot spacer (balances layout or holds profile avatar indicator)
            Box(
                modifier = Modifier
                    .size(40.dp)
                    .background(Color.White.copy(alpha = 0.03f), CircleShape)
                    .border(Dimensions.BorderMicro, CyanGlow.copy(alpha = 0.12f), CircleShape),
                contentAlignment = Alignment.Center
            ) {
                Box(
                    modifier = Modifier
                        .size(6.dp)
                        .background(Color(0xFF34D399), CircleShape) // online green light
                )
            }
        }

        // Center aligned structural layout matching our exact typography weights
        Column(
            horizontalAlignment = Alignment.CenterHorizontally,
            modifier = Modifier.padding(top = Dimensions.SpaceMicro)
        ) {
            Text(
                text = title,
                fontFamily = FontFamily.SansSerif,
                fontWeight = FontWeight.Bold,
                fontSize = 15.sp,
                letterSpacing = 2.sp,
                color = CyanGlow,
                textAlign = TextAlign.Center
            )
            Spacer(modifier = Modifier.height(2.dp))
            Text(
                text = subtitle,
                fontFamily = FontFamily.Monospace,
                fontWeight = FontWeight.Bold,
                fontSize = 8.sp,
                letterSpacing = 1.5.sp,
                color = WhiteDim.copy(alpha = 0.55f),
                textAlign = TextAlign.Center
            )
        }
    }
}
