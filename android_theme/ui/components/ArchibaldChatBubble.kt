package com.example.archibald.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Shadow
import androidx.compose.ui.text.font.FontFamily
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.unit.dp
import androidx.compose.ui.unit.sp
import com.example.archibald.ui.theme.*

/**
 * Archibald Design System - Composable Chat Bubbles
 * Implements the pristine visual disparity between the User's deep-blue container and
 * Archi's teal border offset bubble with floating overlay avatar.
 */

@Composable
fun UserChatBubble(
    text: String,
    timestamp: String,
    modifier: Modifier = Modifier
) {
    Box(
        modifier = modifier
            .fillMaxWidth()
            .padding(horizontal = Dimensions.SpaceLarge, vertical = Dimensions.SpaceTiny),
        contentAlignment = Alignment.CenterEnd
    ) {
        Column(horizontalAlignment = Alignment.End) {
            // Dark glassmorphic user prompt bubble with asymmetric shapes
            Box(
                modifier = Modifier
                    .widthIn(max = 280.dp)
                    .background(
                        color = UserChatBg,
                        shape = CreativeShapes.UserBubbleShape
                    )
                    .border(
                        width = Dimensions.BorderMicro,
                        color = CyanGlow.copy(alpha = 0.2f),
                        shape = CreativeShapes.UserBubbleShape
                    )
                    .padding(
                        horizontal = Dimensions.ChatBubblePaddingHorizontal,
                        vertical = Dimensions.ChatBubblePaddingVertical
                    )
            ) {
                Text(
                    text = text,
                    style = UserMessageStyle
                )
            }
            
            // Time marker with Cyan confirmation tik
            Row(
                modifier = Modifier.padding(top = Dimensions.SpaceTiny, end = Dimensions.SpaceTiny),
                verticalAlignment = Alignment.CenterVertically
            ) {
                Text(
                    text = timestamp,
                    style = TimestampStyle
                )
                Spacer(modifier = Modifier.width(Dimensions.SpaceTiny))
                Icon(
                    imageVector = Icons.Default.Check,
                    contentDescription = "Delivered",
                    tint = CyanGlow.copy(alpha = 0.9f),
                    modifier = Modifier.size(13.dp)
                )
            }
        }
    }
}

@Composable
fun ArchiChatBubble(
    text: String,
    timestamp: String,
    modifier: Modifier = Modifier
) {
    // Left-aligned bubble carrying Archibald's hologram status marker and floating avatar overlay
    Box(
        modifier = modifier
            .fillMaxWidth()
            .padding(horizontal = Dimensions.SpaceLarge, vertical = Dimensions.SpaceMedium),
        contentAlignment = Alignment.CenterStart
    ) {
        Box(
            modifier = Modifier
                .padding(start = 28.dp, top = 12.dp)
                .widthIn(max = 300.dp)
                .background(
                    color = ArchiChatBg,
                    shape = CreativeShapes.ArchiBubbleShape
                )
                .border(
                    width = Dimensions.BorderMicro,
                    color = CyanGlow.copy(alpha = 0.2f),
                    shape = CreativeShapes.ArchiBubbleShape
                )
                .padding(
                    start = Dimensions.SpaceExtraLarge,
                    end = Dimensions.SpaceLarge,
                    top = 26.dp,
                    bottom = Dimensions.SpaceMedium
                )
        ) {
            Column {
                Text(
                    text = text,
                    style = ArchiMessageStyle
                )
                Spacer(modifier = Modifier.height(Dimensions.SpaceTiny))
                Text(
                    text = timestamp,
                    style = TimestampStyle,
                    modifier = Modifier.align(Alignment.End)
                )
            }
        }

        // Floating glowing core avatar positioned overlapping top-left
        Box(
            modifier = Modifier
                .align(Alignment.TopStart)
                .offset(y = (-4).dp)
                .size(Dimensions.AvatarBubbleSize)
                .background(CosmicDark, CircleShape)
                .border(Dimensions.BorderLaser, CyanGlow, CircleShape),
            contentAlignment = Alignment.Center
        ) {
            // Inside laser visual pattern representations (using standard gradients fallback for plug-and-play simplicity)
            Box(
                modifier = Modifier
                    .fillMaxSize()
                    .clip(CircleShape)
                    .background(
                        Brush.verticalGradient(
                            colors = listOf(
                                Color(0xFF14233C),
                                Color(0xFF030911)
                            )
                        )
                    ),
                contentAlignment = Alignment.Center
            ) {
                Text(
                    text = "A",
                    fontFamily = FontFamily.SansSerif,
                    fontWeight = FontWeight.Bold,
                    fontSize = 18.sp,
                    color = CyanGlow,
                    style = androidx.compose.ui.text.TextStyle(
                        shadow = Shadow(
                            color = CyanGlow,
                            offset = Offset(0f, 0f),
                            blurRadius = 8f
                        )
                    )
                )
            }
        }

        // Cyber author "● ARCHI" label positioned next to Archi's avatar head
        Row(
            modifier = Modifier.offset(x = 94.dp, y = (-20).dp),
            verticalAlignment = Alignment.CenterVertically
        ) {
            Box(
                modifier = Modifier
                    .size(5.dp)
                    .background(CyanGlow, CircleShape)
            )
            Spacer(modifier = Modifier.width(Dimensions.SpaceTiny))
            Text(
                text = "ARCHI",
                style = AuthorLabelStyle
            )
        }
    }
}
