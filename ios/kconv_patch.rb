# Monkey patch for kconv compatibility with Ruby 3.4+
# kconv was removed from Ruby 3.4 standard library
# This provides minimal compatibility for CFPropertyList

unless defined?(Kconv)
  module Kconv
    AUTO = 0
    EUC = 1
    SJIS = 2
    BINARY = 3
    ASCII = 4
    UTF8 = 5
    UTF16BE = 6
    UTF16LE = 7
    UTF32BE = 8
    UTF32LE = 9

    def self.toutf8(str)
      str.force_encoding('UTF-8')
    end

    def self.toutf16(str)
      str.encode('UTF-16BE')
    end

    def self.toeuc(str)
      str.encode('EUC-JP')
    end

    def self.tosjis(str)
      str.encode('Shift_JIS')
    end

    def self.guess(str)
      # Simple encoding detection
      return UTF8 if str.encoding == Encoding::UTF_8
      return ASCII if str.ascii_only?
      return BINARY if str.encoding == Encoding::BINARY
      UTF8
    end
  end
end

