# -*- encoding: utf-8 -*-
# stub: liquid-tag-parser 1.9.0 ruby lib

Gem::Specification.new do |s|
  s.name = "liquid-tag-parser".freeze
  s.version = "1.9.0"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Jordon Bedwell".freeze]
  s.date = "2018-04-12"
  s.description = "Parse liquid tags easily".freeze
  s.email = ["jordon@envygeeks.io".freeze]
  s.homepage = "http://github.com/envygeeks/liquid-tag-parser".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.1.0".freeze)
  s.rubygems_version = "3.1.2".freeze
  s.summary = "Parse liquid tags like a professional".freeze

  s.installed_by_version = "3.1.2" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_development_dependency(%q<rake>.freeze, ["~> 12"])
    s.add_development_dependency(%q<pry>.freeze, ["~> 0.11"])
    s.add_development_dependency(%q<rubocop>.freeze, ["= 0.52"])
    s.add_development_dependency(%q<simplecov>.freeze, ["~> 0.16"])
    s.add_development_dependency(%q<rspec>.freeze, [">= 3", "< 4"])
    s.add_development_dependency(%q<luna-rspec-formatters>.freeze, ["~> 3.7"])
    s.add_runtime_dependency(%q<liquid>.freeze, [">= 3.0", "< 5.0"])
    s.add_runtime_dependency(%q<extras>.freeze, ["~> 0.3"])
  else
    s.add_dependency(%q<rake>.freeze, ["~> 12"])
    s.add_dependency(%q<pry>.freeze, ["~> 0.11"])
    s.add_dependency(%q<rubocop>.freeze, ["= 0.52"])
    s.add_dependency(%q<simplecov>.freeze, ["~> 0.16"])
    s.add_dependency(%q<rspec>.freeze, [">= 3", "< 4"])
    s.add_dependency(%q<luna-rspec-formatters>.freeze, ["~> 3.7"])
    s.add_dependency(%q<liquid>.freeze, [">= 3.0", "< 5.0"])
    s.add_dependency(%q<extras>.freeze, ["~> 0.3"])
  end
end
