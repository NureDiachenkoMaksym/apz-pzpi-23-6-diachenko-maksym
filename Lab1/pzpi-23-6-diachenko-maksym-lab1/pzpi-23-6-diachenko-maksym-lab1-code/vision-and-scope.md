Vision and Scope Document
for
Natural Resources Analysis Software System
Version 1.1 approved
Prepared by Diachenko Maksym Mykhailovych
Kharkiv National University of Radio Electronics (NURE)
02.06.2026
Table of Contents
Revision History
Business Requirements
Business requirements define why the Natural Resources Analysis Software System is needed and what value it must provide to organizations and users. The system is intended to centralize information about land, water, forest, and other natural resources, reduce manual report preparation, improve data quality, and support evidence-based environmental and administrative decisions.
Background
In many regions, information about the condition of natural resources is stored in a fragmented way across separate reports, spreadsheets, documents, and disconnected information systems. Data about land, water, forests, minerals, biodiversity, and environmental indicators is often collected by different organizations and updated with different frequency. This makes it difficult to compare indicators over time, prepare consolidated reporting, identify negative trends, and justify management decisions. A unified software system is needed to centralize collection, storage, validation, analysis, and presentation of natural resource data.
Business Opportunity
The system enables a transition from manual report processing to continuous monitoring based on structured data. It reduces the time required to prepare analytical reports, improves transparency of resource management, simplifies detection of negative trends, and supports planning of environmental protection measures and sustainable infrastructure development. The system is relevant for local administrations, environmental agencies, analysts, resource-using organizations, and public stakeholders that need reliable access to summarized natural resource information.
Business Objectives and Success Criteria
The main business objectives and success criteria are:
1. Reduce the time required to prepare a standard regional natural resources report by at least 50% compared with manual preparation.
2. Consolidate data for at least three resource types in the first release: land, water, and forest.
3. Provide time-series tracking with at least three years of historical data and trend visualization.
4. Ensure that at least 95% of imported or manually entered records pass validation rules for required fields, formats, ranges, and reference values.
5. Achieve user acceptance: at least 80% of surveyed users should rate the usability of the system as “good” or higher.
6. Provide stable access to reports and charts within 3 seconds for typical user queries.
7. Support import of up to 10,000 rows within 2 minutes for prepared CSV or Excel datasets.
Customer or Market Needs
Key customer and market needs are:
1. A single repository of natural resource data linked to region, district, reporting period, resource type, indicator, and data source.
2. Data capture through manual forms, CSV/Excel import, uploaded evidence documents, and integration with selected open sources.
3. Simple analytical reporting using tables, charts, summaries by period, and comparisons across territories.
4. Search and filtering by resource type, territory, period, indicator, data source, and publication status.
5. Data quality control through validation rules, reference dictionaries, change logs, and statuses such as draft, verified, and published.
6. Role-based access for administrator, data entry operator, analyst, and read-only guest.
7. Export of results to PDF and Excel for official reporting and further reuse.
8. Web access through modern browsers and, in later versions, mobile access for field observations and quick review of indicators.
Business Risks
Major business risks include:
- Low quality or incomplete source data from different providers. Severity: High. Mitigation: validation rules, reference dictionaries, import templates, confidence labels, and data verification workflow.
- User resistance due to changes in established reporting processes. Severity: Medium. Mitigation: simple user interface, training materials, pilot rollout, and feedback collection.
- Changes in external report formats or open data sources. Severity: Medium. Mitigation: flexible import mappings, versioned connectors, and configurable templates.
- Insufficient resources to maintain reference data and classifiers. Severity: Medium. Mitigation: assign ownership for dictionaries, define update routines, and use automated reminders.
- Security and access control risks for internal or sensitive reports. Severity: High. Mitigation: authentication, RBAC, audit logs, encrypted transport, backups, and access policies.
- Inaccurate interpretation of analytical results. Severity: Medium. Mitigation: clear metadata, visible data sources, confidence indicators, and human review before publication.
Vision of the Solution
This section defines the long-term vision of the solution. The vision describes the intended role of the system, its main capabilities, and the assumptions that influence the project scope and implementation priorities.
Vision Statement
The Natural Resources Analysis Software System should become a “single window” for collecting, storing, validating, analyzing, and presenting regional natural resource data. After implementation, specialists will be able to access up-to-date indicators in a few clicks, observe trends on charts, compare territories, prepare reports for management, and make evidence-based decisions about conservation and sustainable use of natural resources.
Major Features
Major features of the product are:
1. Resource and indicator catalog for land, water, forest, minerals, and other resource categories with reference data and measurement units.
2. Data acquisition through manual entry, bulk import from CSV/Excel, uploaded source reports, and prepared external data links.
3. Versioned storage with change logs, data source tracking, reporting period, and publication status.
4. Analytics: aggregation by period and territory, comparisons, basic statistics such as min, max, average, and rate of change.
5. Visualization: line charts for trends, bar charts for comparisons, summary tables, and future map-based views.
6. Reporting and export using standard report templates with PDF and Excel output.
7. Role-based access control, including administrator, data entry operator, analyst, and guest roles.
8. Mobile access for field observations and quick review of key indicators.
9. Server-side API for interaction with web, mobile, and IoT components.
10. Future AI-assisted anomaly detection, forecasting, and report summarization.
Assumptions and Dependencies
Assumptions:
- Users have access to PCs or laptops with a modern web browser; the primary scenario is a web application.
- Data sources provide information in parsable formats such as CSV or Excel, or data can be entered manually.
- Some datasets may rely on open data sources; their availability and stability are not guaranteed.
- Third-party libraries may be used for charts, maps, PDF export, Excel export, authentication, and data visualization.
- Use of geodata depends on availability of required reference layers and coordinate data.
- Mobile and IoT components will interact with the server through documented API endpoints.

Dependencies:
- Server infrastructure or cloud hosting for the application and database.
- Relational DBMS such as PostgreSQL or MySQL for structured data storage.
- External open datasets, regional reports, and uploaded documents used as input sources.
- Stable network connection for web, mobile, and IoT synchronization.
- Availability of specialists who can verify data quality and interpret analytical results.
Scope and Limitations
This section defines the scope of the proposed solution and explains which capabilities will be included in the initial release, which capabilities are planned for subsequent releases, and which features are intentionally excluded or limited. The scope covers the complete system concept, including server-side components, web client, mobile client, IoT-related data collection, and future AI-assisted functionality.
Scope of Initial Release
Release 1 (MVP) focuses on core accounting, reporting, and analytical features that deliver the highest practical value with acceptable implementation complexity. The initial release includes the complete basic system architecture: server-side backend, web client, mobile client, database, and limited IoT data ingestion.

Server-side scope:
- REST API for interaction with web, mobile, and IoT clients.
- Authentication and role-based access control for administrator, data entry operator, analyst, and guest roles.
- Centralized database for territories, resource types, indicators, measurements, data sources, users, and audit records.
- Validation rules for required fields, measurement units, indicator ranges, reporting periods, and reference dictionaries.
- CSV/Excel import with column mapping and basic import error reporting.
- Change log for resource records, including user, date, previous value, new value, and reason for change.
- Export of analytical results to PDF and Excel.
- Basic backup and recovery procedures.

Web client scope:
- Dashboard with summary indicators for land, water, and forest resources.
- Forms for manual data entry and editing of resource measurements.
- Search and filtering by territory, period, resource type, indicator, source, and status.
- Charts for trends over time and comparisons between territories.
- Administrative pages for users, roles, indicators, territories, and reference dictionaries.
- Report generation and export interface.
- Ukrainian and English interface localization.

Mobile client scope:
- Viewing key indicators and recent changes for selected territories.
- Creating field observations with resource type, location, date, description, and optional photo reference.
- Sending observations to the server for later verification by analysts.
- Basic local caching of selected reference data and recently viewed records.
- Synchronization with the server when a network connection is available.

IoT scope:
- Limited ingestion of sensor measurements through API endpoints.
- Support for simple water or environmental monitoring sensors that periodically send numeric readings.
- Registration of sensor identifier, location, resource type, measurement value, timestamp, and status.
- Basic validation of sensor values and marking suspicious readings for analyst review.

Data and analytical scope:
- Support for three primary resource types in the MVP: land, water, and forest.
- Indicator dictionaries with units of measurement and allowed ranges.
- At least three years of historical data where such data is available.
- Summary tables, two or three basic chart types, and comparison views.
- Data statuses: draft, verified, and published.
- Read-only access for guests to published/open data.
Scope of Subsequent Releases
Subsequent releases will extend the system with additional resource types, more advanced analysis, deeper integrations, offline capabilities, and AI-assisted functionality.

Planned future capabilities:
- Additional resource types: minerals, biodiversity, air quality, protected areas, and waste-related indicators, subject to data availability.
- Integration with open-data APIs, environmental portals, and scheduled automatic dataset refresh.
- Geo-visualization with map layers, heatmaps, spatial filtering, and territorial comparison on maps.
- Advanced report builder with configurable templates for different organizations.
- Alerts on threshold breaches, abnormal changes, and missing data.
- Offline mobile fieldwork mode with later synchronization.
- More advanced IoT support, including device management, sensor health status, and configurable thresholds.

AI application:
- AI-assisted anomaly detection for identifying unusual changes in indicators, such as sudden water quality deterioration or rapid decrease in forest coverage.
- Forecasting of selected indicators based on historical time series.
- Automatic data quality recommendations, including detection of missing values, duplicates, outliers, and inconsistent units.
- Natural language summaries for analytical reports and dashboards.
- Risk scoring for territories based on combined indicators.
- Image and satellite-data analysis in future versions, for example classification of land cover or detection of vegetation changes.

Data collection for AI:
- Historical measurements for land, water, forest, and later resource categories.
- Time series of verified indicators by territory and reporting period.
- Data corrections and analyst decisions recorded in change logs.
- Imported datasets and metadata about their sources and reliability.
- Sensor measurements from IoT devices with timestamps and location information.
- User feedback about false alerts, confirmed anomalies, and accepted recommendations.
- Spatial attributes and geodata layers when available.

AI training and use strategy:
- In early subsequent releases, the system should use ready-made AI services or cloud APIs for text summarization and simple anomaly explanations.
- For forecasting and domain-specific anomaly detection, the preferred approach is to begin with classical statistical models and gradually move to machine learning models trained on collected historical data.
- Full custom model training should be introduced only after the system accumulates enough verified data.
- Human review must remain mandatory for critical decisions; AI output should support analysts, not replace them.
- Models should be periodically evaluated using accuracy metrics, false positive rate, and analyst feedback.
Limitations and Exclusions
The following limitations and exclusions define what is not planned for the MVP and what is intentionally restricted to keep the project realistic.

MVP limitations:
- The MVP does not provide full-scale machine learning forecasting or optimization models.
- The MVP does not guarantee correctness of external open data; the system records source, acquisition date, and verification status.
- The MVP does not include legally binding electronic document workflow or digital signatures.
- The MVP does not replace cadastral, geodetic, or official land registry systems.
- Offline mobile work is limited to local caching; full offline data collection and conflict resolution are planned for later releases.
- IoT support is limited to simple numeric sensor readings through API endpoints; full device lifecycle management is not included in the MVP.
- Public users can access only published/open data, not internal drafts or restricted reports.

AI limitations:
- AI-based recommendations are not legal or administrative decisions.
- AI explanations and forecasts must be reviewed by responsible specialists before use in official reporting.
- The system will not train complex custom AI models until enough verified historical data is collected.
- AI functions will not process personal or confidential data unless appropriate access controls and data protection measures are implemented.

Technical and organizational exclusions:
- The system does not provide guaranteed continuous availability for emergency operations in the initial academic release.
- The system does not include paid cloud infrastructure as a mandatory requirement; free tiers and open-source tools are preferred.
- The system does not include automatic verification of every uploaded document; responsibility for source reliability remains with authorized users.
- The system does not replace expert environmental analysis; it provides structured data, calculations, visualization, and decision support.
Business Context
This section summarizes the business context of the project, including stakeholder categories, project priorities, and the expected operating environment.
Stakeholder Profiles
Stakeholders are individuals, groups, or organizations that are involved in the project or affected by its results. The main stakeholder profiles for the Natural Resources Analysis Software System are summarized in the table below.
Project Priorities
The project priorities are determined by the academic deadline, the need to implement the most valuable functionality first, and the goal of minimizing cost through open-source technologies.
Operating Environment
The system is assumed to be used as a web-based application with a centralized server and database. Users may be distributed across different districts of a region and primarily work during standard office hours.

Availability: the system should be available at least 99% during working hours in the pilot scenario.
Performance: typical reports and charts should open within 3 seconds; import of up to 10,000 rows should complete within 2 minutes under normal conditions.
Reliability: the system should support database backups, integrity checks, confirmation before destructive actions, and change logs.
Security: authentication, role-based access control, action logging, and TLS-protected data transport are required.
Compatibility: the web client should support modern browsers such as Chrome, Edge, and Firefox; reports should be exportable to PDF and Excel.
Mobile environment: mobile users may work in the field using Android devices and synchronize observations with the central server.
IoT environment: simple monitoring sensors may send periodic measurements through API endpoints when network access is available.
Name | Date | Reason For Changes | Version
Diachenko Maksym Mykhailovych | 22.12.2025 | Initial version of the document | 1.0
Diachenko Maksym Mykhailovych | 02.06.2026 | Updated Scope and Limitations according to Lab1 requirements | 1.1
Stakeholder | Major Value | Attitudes | Major Interests | Constraints
Local government / regional administrations | Fast reporting and trend control to support planning and decision-making | Interested in clear analytics, standardized reports, and transparency | Dashboards, exports, comparability across districts, auditability | Regulatory deadlines; limited time for training
Environmental agencies / inspections | Monitoring indicators and supporting conservation measures | High interest in data quality, change logs, and threshold control | Validation, trusted sources, anomaly detection, status workflow | Need accurate reference data and auditability
Analysts / economists / planners | Comparisons across territories, trends, and preparation of analytical briefs | Positive attitude; expect flexible filtering and export | Filters, time series, summaries, charts, PDF/Excel export | Performance requirements for large datasets
Resource-using companies (optional) | Aligning indicators and improving transparency for reporting | Interested in access to their own data and reports | Role separation, evidence upload, report generation | Strict access separation and confidentiality
Public / NGOs (open data) | Public insight into the state of resources and transparency | High interest in visualizations and simple reports | Read-only views, public charts, open datasets | Access limited to open/public subset of data
Dimension | Driver (state objective) | Constraint (state limits) | Degree of Freedom (state allowable range)
Schedule | MVP ready for academic demonstration and regional pilot scenario by the end of the semester | Fixed academic deadline | Lower-priority features may be moved to subsequent releases
Features | Deliver 70-80% of high-priority capabilities in the MVP | Keep MVP within basic accounting, validation, analysis, reporting, and client access | Map, AI, advanced IoT, and forecasting features may be deferred
Quality | At least 90% of acceptance tests should pass for core scenarios | Basic security, validation, and data integrity are mandatory | Minor UX improvements may be deferred
Staff | Academic project team of 2-4 participants | Limited development and support time | Use open-source frameworks and ready libraries
Cost | Minimize project cost through open-source tools and free tiers | No mandatory paid services in the MVP | Cloud services may be used only if free or educational tiers are available