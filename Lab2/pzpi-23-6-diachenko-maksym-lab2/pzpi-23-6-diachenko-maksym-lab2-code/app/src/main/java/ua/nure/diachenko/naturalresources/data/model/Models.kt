package ua.nure.diachenko.naturalresources.data.model

data class ResourceIndicator(
    val id: Long,
    val resourceType: String,
    val territory: String,
    val indicatorName: String,
    val value: Double,
    val unit: String,
    val period: String
)

data class ObservationRequest(
    val resourceType: String,
    val territory: String,
    val indicatorName: String,
    val value: Double,
    val unit: String,
    val latitude: Double?,
    val longitude: Double?,
    val comment: String?
)

data class DashboardSummary(
    val totalObservations: Int,
    val forestAverage: Double,
    val waterAverage: Double,
    val soilAverage: Double,
    val riskLevel: String
)

