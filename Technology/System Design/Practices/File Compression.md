---
area: technology
domain: compression
type: guide
title: File Compression
description: Practical advice on choosing a compression format and settings (RAR, 7z/LZMA2, zip, gzip/brotli, zstd, dictionary size, solid mode) based on file type and speed, ratio, and compatibility needs.
timestamp: "2026-09-24T00:00:00.000Z"
tags:
  - technology
  - compression
  - archiving
---

# File Compression

It depends on what kind of file you plan to compress.
Media such as movies, photos, and games doesn't compress much.
Text is the easy case: it compresses well and by a lot.
How you compress is something you have to weigh against your own needs: do you want fast compression or a high ratio? And whether decompression should be slow or fast.
Is the file packaged once and downloaded in many places and used many times, or is it disposable: compress, send, the other side pulls it, decompresses, and throws it away?
Once you've worked that out, here is my recommendation:

- Only use RAR if you need the recovery record. It provides error correction that helps somewhat when a download is corrupted. It compresses worse than LZMA, sometimes even worse than zstd, and decompresses more slowly. It compresses better than zip, but compatibility is not great.
- For the tightest possible compression, use the LZMA2 algorithm, with the `7z` extension. Or pack all the files into a tar (7-zip has this feature too), then compress the tar with the LZMA2 method, giving the `xz` extension.
  However, this is fairly expensive in memory and time.
- For the widest device compatibility, use zip.
- For text, I recommend the `gz` or `br` extension, with the gzip or brotli method. For a single file you can just choose gzip with the `gz` extension; for multiple files, pack them into a tar, then compress the tar with gz or br.
- For moderate compression time, a decent ratio, and fast decompression, I recommend the zstd method, with the `7z` extension, or pack into a tar and then compress with zstd, giving the `zst` extension.
- About levels: roughly 90% of the time, a higher level means slower compression, more memory, and a tighter file. Balance it against your needs. (The other 10% are edge cases.)
- Word size: normally just max it out.
- Dictionary size: you have to benchmark this for each kind of data, because its performance looks like a bell curve, rising up to a point and then flattening out. My advice is that no matter where the peak of the curve is, you shouldn't set it above 128MB. It burdens the decompressing machine, and the compressing machine wastes resources compressing for no gain.
- Solid mode: decide based on how you'll decompress.
  If you want to extract everything in one go, missing nothing, choose solid. If you sometimes want to extract only a few specific files, adjust the block size to your needs (I don't know how to recommend a size for this).
  Roughly, with solid you bundle everything into one block and compress it, which gives better compression, but to get a file you have to unpack the whole block. For example, with a sequence of files 1, 2, 3, 4, ..., to get file 3 you still have to run through 1 and 2.
  Adjusting the size splits the data into blocks of that size and compresses each, which makes it more convenient to reach a given file. No-solid means each file is separate: compress each one individually, then package them. Zip uses this no-solid approach, giving efficient random-access reads but lower compression.

---

P.S. WinRAR can only compress to zip, rar4, and rar (rar5), but it can extract many formats.
7-zip can pack tar and compress into many formats such as zip, 7z, lzma, zst, tar.bz2, tar.gz, tar.xz, tar.zstd, lz4, lz5, and so on. It can extract A LOT of formats, including rar (it just can't create them because RAR is proprietary; the extraction method is open source, but the license forbids reverse engineering the compression method).

On features, my vote is 7zip > Peazip >>>>> WinRAR. (WinRAR has exactly one thing the other two lack, the Recovery Record; the other two have everything else, and do it even better.)
But for UI, the vote is the reverse. =))

> **See also:** [3 2 1 Backup Strategy](/Technology/System Design/Practices/3 2 1 Backup Strategy) · [Search Engine](/Technology/System Design/Practices/Search Engine)
