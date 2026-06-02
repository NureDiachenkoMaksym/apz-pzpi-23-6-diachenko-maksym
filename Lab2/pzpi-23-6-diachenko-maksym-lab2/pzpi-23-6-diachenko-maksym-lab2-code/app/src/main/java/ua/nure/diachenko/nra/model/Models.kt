package ua.nure.diachenko.nra.model

import kotlinx.serialization.Serializable

@Serializable
data class ResourceType(
    val id: String,
    val nameUk: String,
    val nameEn: String
)

@Serializable
data class Indicator(
    val id: String,
    val resourceTypeId: String,
    val name: String,
    val unit: String,
    val minValue: Double? = null,
    val maxValue: Double? = null
)

@Serializable
data class MeasurementDraft(
    val id: String,
    val resourceTypeId: String,
    val indicatorId: String,
    val territory: String,
    val period: String,
    val value: Double,
    val comment: String,
    val status: SyncStatus
)

enum class SyncStatus {
    Draft,
    Synced,
    Error
}
