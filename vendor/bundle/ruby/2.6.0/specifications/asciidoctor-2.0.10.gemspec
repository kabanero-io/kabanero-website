# -*- encoding: utf-8 -*-
# stub: asciidoctor 2.0.10 ruby lib

Gem::Specification.new do |s|
  s.name = "asciidoctor".freeze
  s.version = "2.0.10"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "bug_tracker_uri" => "https://github.com/asciidoctor/asciidoctor/issues", "changelog_uri" => "https://github.com/asciidoctor/asciidoctor/blob/master/CHANGELOG.adoc", "mailing_list_uri" => "http://discuss.asciidoctor.org", "source_code_uri" => "https://github.com/asciidoctor/asciidoctor" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["Dan Allen".freeze, "Sarah White".freeze, "Ryan Waldron".freeze, "Jason Porter".freeze, "Nick Hengeveld".freeze, "Jeremy McAnally".freeze]
  s.date = "2018-03-20"
  s.description = "A fast, open source text processor and publishing toolchain for converting AsciiDoc content to HTML 5, DocBook 5, and other formats.".freeze
  s.email = ["dan.j.allen@gmail.com".freeze]
  s.executables = ["asciidoctor".freeze]
  s.files = ["bin/asciidoctor".freeze]
  s.homepage = "https://asciidoctor.org".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.1.2".freeze
  s.summary = "An implementation of the AsciiDoc text processor and publishing toolchain".freeze

  s.installed_by_version = "3.1.2" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_development_dependency(%q<asciimath>.freeze, ["~> 1.0.0"])
    s.add_development_dependency(%q<coderay>.freeze, ["~> 1.1.0"])
    s.add_development_dependency(%q<concurrent-ruby>.freeze, ["~> 1.1.0"])
    s.add_development_dependency(%q<cucumber>.freeze, ["~> 3.1.0"])
    s.add_development_dependency(%q<erubis>.freeze, ["~> 2.7.0"])
    s.add_development_dependency(%q<haml>.freeze, ["~> 5.0.0"])
    s.add_development_dependency(%q<minitest>.freeze, ["~> 5.11.0"])
    s.add_development_dependency(%q<nokogiri>.freeze, ["~> 1.10.0"])
    s.add_development_dependency(%q<rake>.freeze, ["~> 12.3.0"])
    s.add_development_dependency(%q<rouge>.freeze, ["~> 3.3.0"])
    s.add_development_dependency(%q<rspec-expectations>.freeze, ["~> 3.8.0"])
    s.add_development_dependency(%q<slim>.freeze, ["~> 4.0.0"])
    s.add_development_dependency(%q<tilt>.freeze, ["~> 2.0.0"])
  else
    s.add_dependency(%q<asciimath>.freeze, ["~> 1.0.0"])
    s.add_dependency(%q<coderay>.freeze, ["~> 1.1.0"])
    s.add_dependency(%q<concurrent-ruby>.freeze, ["~> 1.1.0"])
    s.add_dependency(%q<cucumber>.freeze, ["~> 3.1.0"])
    s.add_dependency(%q<erubis>.freeze, ["~> 2.7.0"])
    s.add_dependency(%q<haml>.freeze, ["~> 5.0.0"])
    s.add_dependency(%q<minitest>.freeze, ["~> 5.11.0"])
    s.add_dependency(%q<nokogiri>.freeze, ["~> 1.10.0"])
    s.add_dependency(%q<rake>.freeze, ["~> 12.3.0"])
    s.add_dependency(%q<rouge>.freeze, ["~> 3.3.0"])
    s.add_dependency(%q<rspec-expectations>.freeze, ["~> 3.8.0"])
    s.add_dependency(%q<slim>.freeze, ["~> 4.0.0"])
    s.add_dependency(%q<tilt>.freeze, ["~> 2.0.0"])
  end
end
