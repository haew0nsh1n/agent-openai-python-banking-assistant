import logging
import os


def configure_logging(level: str = "INFO"):
    logging.basicConfig(
        level=getattr(logging, level.upper(), logging.INFO),
        format="%(asctime)s | %(levelname)s | %(name)s | %(message)s",
    )


def configure_azure_monitor():
    """Configure Azure Monitor OpenTelemetry for distributed tracing."""
    connection_string = os.environ.get("APPLICATIONINSIGHTS_CONNECTION_STRING")

    if not connection_string:
        logging.warning(
            "APPLICATIONINSIGHTS_CONNECTION_STRING not set, skipping Azure Monitor configuration")
        return

    try:
        from azure.monitor.opentelemetry import configure_azure_monitor as az_configure
        from opentelemetry.instrumentation.fastapi import FastAPIInstrumentor

        az_configure(
            connection_string=connection_string,
            enable_live_metrics=True,
            instrumentation_options={
                "azure_sdk": {"enabled": True},
                "fastapi": {"enabled": True},
                "requests": {"enabled": True},
            }
        )
        logging.info("Azure Monitor OpenTelemetry configured successfully")
    except Exception as e:
        logging.error(f"Failed to configure Azure Monitor: {e}")
