export async function onRequestGet() {
    const url =
        "https://api.github.com/repos/volkhen/thunderbird-archive-viewer/releases/tags/v0.8.2";

    try {
        const response = await fetch(url, {
            headers: {
                "Accept": "application/vnd.github+json",
                "User-Agent": "Marisoft-Website"
            },
            cf: {
                cacheTtl: 1800,
                cacheEverything: true
            }
        });

        if (!response.ok) {
            return Response.json(
                { error: "GitHub API request failed" },
                { status: 502 }
            );
        }

        const release = await response.json();

        const asset = release.assets.find(asset =>
            asset.name.toLowerCase().includes("windows") &&
            asset.name.toLowerCase().endsWith(".zip")
        );

        if (!asset) {
            return Response.json(
                { error: "Windows release asset not found" },
                { status: 404 }
            );
        }

        return Response.json({
            version: release.tag_name.replace(/^v/, ""),
            downloads: asset.download_count,
            filename: asset.name
        });

    } catch (error) {
        return Response.json(
            { error: "Unable to retrieve download count" },
            { status: 500 }
        );
    }
}
