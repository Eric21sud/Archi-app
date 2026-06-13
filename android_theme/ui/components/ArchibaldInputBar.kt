package com.example.archibald.ui.components

import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardActions
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.ArrowUpward
import androidx.compose.material.icons.filled.Mic
import androidx.compose.material3.Icon
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.input.ImeAction
import androidx.compose.ui.unit.dp
import com.example.archibald.ui.theme.*

/**
 * Archibald Design System - Composable Control Input Bar
 * Matches exactly our responsive glassmorphic glowing prompt text area.
 */

@Composable
fun ArchibaldInputBar(
    onSendMessage: (String) -> Unit,
    onVoiceClick: () -> Unit,
    modifier: Modifier = Modifier
) {
    var textState by remember { mutableStateOf("") }

    val handleSend = {
        if (textState.isNotBlank()) {
            onSendMessage(textState)
            textState = ""
        }
    }

    Row(
        modifier = modifier
            .fillMaxWidth()
            .padding(horizontal = Dimensions.SpaceLarge, vertical = Dimensions.SpaceSmall)
            .background(
                color = InputBg,
                shape = CreativeShapes.PillShape
            )
            .border(
                width = Dimensions.BorderMicro,
                color = CyanGlow.copy(alpha = 0.25f),
                shape = CreativeShapes.PillShape
            )
            .padding(v = Dimensions.SpaceSmall, h = Dimensions.SpaceMedium),
        verticalAlignment = Alignment.CenterVertically
    ) {
        // Voice activation button (Microphone) with futuristic glass container
        Box(
            modifier = Modifier
                .size(38.dp)
                .background(Color.White.copy(alpha = 0.05f), CircleShape)
                .border(Dimensions.BorderMicro, WhiteDim.copy(alpha = 0.15f), CircleShape)
                .clickable { onVoiceClick() },
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.Mic,
                contentDescription = "Voice Mode",
                tint = CyanGlow.copy(alpha = 0.85f),
                modifier = Modifier.size(17.dp)
            )
        }

        Spacer(modifier = Modifier.width(Dimensions.SpaceMedium))

        // Customizable basic text field with native scroll settings and prompt styles
        BasicTextField(
            value = textState,
            onValueChange = { textState = it },
            textStyle = InputPromptTextStyle,
            modifier = Modifier
                .weight(1f)
                .padding(vertical = Dimensions.SpaceMicro),
            singleLine = false,
            maxLines = 4,
            keyboardOptions = KeyboardOptions(
                imeAction = ImeAction.Send
            ),
            keyboardActions = KeyboardActions(
                onSend = { handleSend() }
            ),
            decorationBox = { innerTextField ->
                Box(contentAlignment = Alignment.CenterStart) {
                    if (textState.isEmpty()) {
                        Text(
                            text = "Ordonner à Archibald...",
                            style = PlaceholderTextStyle
                        )
                    }
                    innerTextField()
                }
            }
        )

        Spacer(modifier = Modifier.width(Dimensions.SpaceSmall))

        // Active Send Key (Arrow with holographic background)
        val isInputValid = textState.isNotBlank()
        Box(
            modifier = Modifier
                .size(38.dp)
                .clip(CircleShape)
                .background(
                    if (isInputValid) CyanGlow else Color.White.copy(alpha = 0.05f)
                )
                .clickable(enabled = isInputValid) { handleSend() },
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = Icons.Default.ArrowUpward,
                contentDescription = "Submit Command",
                tint = if (isInputValid) CosmicDark else WhiteDim.copy(alpha = 0.4f),
                modifier = Modifier.size(17.dp)
            )
        }
    }
}

// Convenient Kotlin extension for simple vertical and horizontal padding matching dimensions
fun Modifier.padding(v: androidx.compose.ui.unit.Dp, h: androidx.compose.ui.unit.Dp): Modifier =
    this.padding(vertical = v, horizontal = h)
